Education = new Mongo.Collection(null);
Records = new Mongo.Collection(null);

Forms.mixin(Template.profile);

function profilePassedGood(user) {
  return true;
}

Template.profile.events({
  'click #editRecord': function(event, templateInstance) {
    templateInstance.recordToEditId.set(this._id)
  },
  'click #deleteRecord': function(event, templateInstance) {
    Records.remove({_id: this._id})
  },
  'click #addRecord': function(event, templateInstance) {
    Records.insert({
      isNew: true,
      type: 'record'
    })
  },
  'click #addEducation': function(event, templateInstance) {
    Education.insert({
      type: 'education'
    })
  },
  'click .saveProfile': function (event, templateInstance, doc) {
    event.preventDefault()
    var newData = {
      profile: {
        blurb: $(".blurbtxt").val(),
        p_phone: $('#p-phone').val(),
        p_email: $('#p-email').val(),
        p_website: $('#p-website').val(),
        p_linkedin: $('#p-linkedin').val(),
        mresume: $('#mResume').val(),
        records: Records.find().fetch()
      },
      onboard: {
        modalDashboard: Meteor.user().onboard.modalDashboard || false,
        linkedin: Meteor.user().onboard.linkedin || false
      }
    };

    if (!newData.profile.p_phone) {
      alert("Missing phone")
    } else if(!newData.profile.p_email){
      alert("Missing Email")
    } else {
      newData.onboard.profileStep = profilePassedGood(Meteor.user());
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: newData
      }, function(error, result) {
        if (error) {
          FlashMessages.sendInfo(error.message);
        } else {
          FlashMessages.sendInfo("Profile saved.");
          Records.remove({})
          templateInstance.inserted.set(false);
        }
      });
    }
  }
});

Template.profile.helpers({
  "userinfo": function() {
      return Meteor.users.findOne() || {};
  },
  records: function() {
    return Records.find();
  },
  education:function() {
    return Education.find();
  },
  showEditRecord: function() {
    return this.isNew || Template.instance().recordToEditId.get() === this._id;
  },
  recordData: function() {
    var data = this;
    data.templateParent = Template.instance();
    return data;
  }
});

Template.profile.onRendered(function() {
  var self = this;
  Meteor.setTimeout(function() {
    $("#dropzoneProfile").dropzone({
      url: 'none',
      maxFiles: 1,
      accept: function(file, done) {
        uploadCSV(file);
      }
    });
  }, 0)

  this.autorun(function() {
    const user = Meteor.user() && Meteor.user().profile
    if (user && user.records && user.records.length > 0 && !self.inserted.get()) {
      user.records.forEach(function(record) {
        delete record._id;
        Records.insert(record)
      });
      self.inserted.set(true);
    }
  })
})

Template.profile.onCreated(function() {
  var self = this;
  self.recordToEditId = new ReactiveVar(null)
  self.inserted = new ReactiveVar(false)
})
