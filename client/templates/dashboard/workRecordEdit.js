Forms.mixin(Template.workRecordEdit);

Template.workRecordEdit.events({
  'click .workHereInput': function(event, template) {
    template.currentlyWorkHere.set(template.$(`#workHere${template.data.data._id}`).is(":checked"))
  },
  'click #cancelEdit': function(event, template) {
    template.data.data.templateParent.recordToEditId.set(null);
  },
  'documentSubmit': function (event, template, doc) {
    console.log("entro", doc);
    event.preventDefault();
    const userId = Meteor.userId();
    // const userRecords = Meteor.user() && Meteor.user().profile.records;
    const documentId = doc._id;
    delete doc._id;
    doc.workHere = template.$(`#workHere${template.data.data._id}`).is(":checked");
    if (!doc.isNew) {
      console.log("edit");
      Records.update(
        documentId, {
          $set: doc
        }
      );
      Meteor.users.update({
        _id: userId
      }, {
        $set: {'profile.records': Records.find().fetch()}
      }, function(error, result) {
        if (!error) {
          template.data.data.templateParent.recordToEditId.set(null);
        }
      });
    } else {
      doc.isNew = false;
      Meteor.users.update({
        _id: userId
      }, {
        $push: {'profile.records': doc}
      }, function(error, result) {
        if (!error) {
          Records.update(
            documentId, {
              $set: doc
            }
          );
          template.data.data.templateParent.recordToEditId.set(null);
        }
      });
    }
   },
  'click #delete': function(event, templateInstance) {
    Records.remove({
      _id: templateInstance.data._id
    });
    templateInstance.data.data.templateParent.recordToEditId.set(null);
  },
})


Template.workRecordEdit.helpers({
  record: function() {
    return Template.instance().data.data;
  },
  isDisabled: function() {
    return Template.instance().currentlyWorkHere.get();
  }
})

Template.workRecordEdit.onCreated(function() {
  const self = this;
  self.currentlyWorkHere = new ReactiveVar(true)
});

Template.workRecordEdit.onRendered(function() {
  var self = this;
  // console.log("este es el edit",self.data);
  var form = Forms.instance();
  form.doc(Records.findOne({
    _id: self.data.data._id
  }))
})
