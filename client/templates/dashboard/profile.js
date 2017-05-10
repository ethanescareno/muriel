Education = new Mongo.Collection(null);
Records = new Mongo.Collection(null);
Forms.mixin(Template.profile);

function profilePassedGood(newData) {
  let response = false;
  //To call a profile complete we need a short bio, phone, email, something in mini resume, and at least one work record
  if (newData.profile.blurb && newData.profile.p_phone && newData.profile.p_email && newData.profile.mresume && newData.profile.records && newData.profile.records.length > 0) {
    response = true
  }
  return response;
}

function initiDropZone(tmpl) {
  Meteor.setTimeout(function() {
    $("#dropzoneProfile").dropzone({
      url: 'none',
      maxFiles: 1,
      accept: function(file, done) {
        tmpl.spinner.set(true);
        var fsFile = new FS.File(file);
        fsFile.metadata = {
          owner: Meteor.userId()
        }
        var queryPicture = ProfileImages.findOne({
          'metadata.owner': Meteor.userId()
        })
        if (queryPicture) {
          ProfileImages.remove({_id: queryPicture._id})
        }
        Dropzone.forElement("#dropzoneProfile").removeAllFiles(true);
        Meteor.setTimeout(function(){
          ProfileImages.insert(fsFile, function (error) {
            if (error) {
              alert(error.message)
            } else {
              tmpl.showEditImage.set(false);
              tmpl.spinner.set(false);
            }
          });
        },2000)
      }
    });
  }, 0)
}

Template.profile.events({
  'click .previewProfile': function() {
    const user = Meteor.user();
    const newTab = Router.url('recruiter-reviews', {
      city: user.profile && user.profile.city || 'noCity',
      zipcode: user.profile && user.profile.zip || 'noZipcode',
      firstName: user.profile && user.profile.firstName || 'nofirstname',
      lastName: user.profile && user.profile.lastName || 'nolastName',
      userId: user._id
    });
    window.open(newTab);
  },
  'click #editPicture': function(event, templateInstance) {
    templateInstance.showEditImage.set(true);
    initiDropZone(templateInstance);
  },
  'click #editRecord': function(event, templateInstance) {
    templateInstance.recordToEditId.set(this._id)
  },
  'click #deleteRecord': function(event, templateInstance) {
    Records.remove({_id: this._id})
  },
  'click #editEducation': function(event, templateInstance) {
    templateInstance.educationToEditId.set(this._id)
  },
  'click #deleteEducation': function(event, templateInstance) {
    Education.remove({_id: this._id})
  },
  'click #addRecord': function(event, templateInstance) {
    event.preventDefault();
    Records.insert({
      isNew: true,
      type: 'record'
    })
  },
  'click #addEducation': function(event, templateInstance) {
    event.preventDefault();
    Education.insert({
      isNew: true,
      type: 'education'
    })
  },
  'click .saveProfile': function (event, templateInstance, doc) {
    event.preventDefault();
    const user = Meteor.user();
    const newData = {
      profile: {
        firstName: user.profile && user.profile.firstName,
        lastName: user.profile && user.profile.lastName,
        workStatus:user.profile && user.profile.workStatus,
        zip:user.profile && user.profile.zip,
        phone:user.profile && user.profile.phone,
        blurb: $(".blurbtxt").val(),
        p_phone: $('#p-phone').val(),
        p_email: $('#p-email').val(),
        p_website: $('#p-website').val(),
        p_linkedin: $('#p-linkedin').val(),
        mresume: $('#mResume').val(),
        records: Records.find().fetch(),
        education: Education.find().fetch(),
        industries: user.profile && user.profile.industries,
        createAcct1: user.profile && user.profile.createAcct1,
        city: user.profile && user.profile.city,
        state: user.profile && user.profile.state,
      },
      onboard: {
        modalDashboard: Meteor.user().onboard.modalDashboard || false,
        linkedin: Meteor.user().onboard.linkedin || false
      }
    };

    if (!newData.profile.p_phone) {
      return FlashMessages.sendWarning("Missing phone")
    } else if(!newData.profile.p_email){
      return FlashMessages.sendWarning("Missing Email")
    } else {
      newData.onboard.profileStep = profilePassedGood(newData);
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: newData,

      }, function(error, result) {
        if (error) {
          FlashMessages.sendInfo(error.message);
        } else {
          FlashMessages.sendInfo("Profile saved.");
          Records.remove({})
          Education.remove({})
          templateInstance.inserted.set(false);
          templateInstance.educationInserted.set(false)
        }
      });
    }
  }
});

Template.profile.helpers({
  onboardingComplete: function() {
    const user = Meteor.user();
    if (!user) {
      return;
    }
    const onboard = user && user.onboard;

    if (!onboard) {
      return;
    }
    const profileDone = onboard.profileStep;
    const textDone = onboard.modalDashboard;
    const linkedinDone = onboard.linkedin;
    return profileDone && textDone && linkedinDone;
  },
  "userinfo": function() {
      return Meteor.user() || {};
  },
  records: function() {
    return Records.find();
  },
  recordsExists: function() {
    return Records.find().count();
  },
  education:function() {
    return Education.find();
  },
  educationExists:function() {
    return Education.find().count();
  },
  showNewRecord: function() {
    return this.newRecord;
  },
  showEditRecord: function() {
    return this.isNew || Template.instance().recordToEditId.get() === this._id;
  },
  showEditEducation: function() {
    return this.isNew || Template.instance().educationToEditId.get() === this._id;
  },
  recordData: function() {
    var data = this;
    data.templateParent = Template.instance();
    return data;
  },

  educationData: function() {
    var data = this;
    data.templateParent = Template.instance();
    return data;
  },
  profilePicture: function() {
    return ProfileImages.findOne({
      'metadata.owner': Meteor.userId()
    })
  },
  profilePictureExist: function() {
    return !Template.instance().showEditImage.get() && ProfileImages.find({
      'metadata.owner': Meteor.userId()
    }).count() > 0;
  },
  showEditProfilePicture: function() {
    return Template.instance().showEditImage.get() || ProfileImages.find({
      'metadata.owner': Meteor.userId()
    }).count() === 0;
  },
  getCurrentsize: function() {
    return Template.instance().showEditImage.get() ? 5 : 10;
  },
  spinner: function() {
    return Template.instance().spinner.get();
  }
});

Template.profile.onRendered(function() {
  var self = this;
  initiDropZone(self);
  Records.remove({});
  Education.remove({});
  this.autorun(function() {
    const user = Meteor.user() && Meteor.user().profile
    if (user && user.records && user.records.length > 0 && !self.inserted.get()
      && Records.find().count() === 0) {
      user.records.forEach(function(record) {
        delete record._id;
        Records.insert(record)
      });
      self.inserted.set(true);
    }

    if (user && user.education && user.education.length > 0 && !self.educationInserted.get()
      && Education.find().count() === 0) {
      user.education.forEach(function(education) {
        delete education._id;
        Education.insert(education)
      });
      self.educationInserted.set(true);
    }
    const user1 = Meteor.user();
    if (user1) {
      const onboarding = user1 && user1.onboard;
      if (onboarding) {
        const modalPassed = onboarding.modalDashboard;
        const profilePassed = onboarding.profileStep;
        const linkedinPassed = onboarding.linkedin;
        if (!modalPassed) {
          // Blaze.renderWithData(Template.modal, {
          //   onSubmit: function(event, templateInstance) {
          //     Meteor.call('updateModalUser');
          //     $('.modal').modal('hide');
          //   },
          //   modalTitle: 'Please Read Careful(profile)',
          //   modalToRenderName: 'longText'
          // }, document.body);
        } else if (!profilePassed) {
          Router.go('profile');
        } else if (!linkedinPassed) {
          Router.go('contacts');
        }
      }
    }
  })
})

Template.profile.onCreated(function() {
  var self = this;
  self.recordToEditId = new ReactiveVar(null)
  self.educationToEditId = new ReactiveVar(null)
  self.inserted = new ReactiveVar(false)
  self.showEditImage = new ReactiveVar(false)
  self.educationInserted = new ReactiveVar(false)
  self.spinner = new ReactiveVar(false)
})
