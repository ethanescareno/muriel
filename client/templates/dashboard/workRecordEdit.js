Forms.mixin(Template.workRecordEdit);

Template.workRecordEdit.events({
  'click #cancelEdit': function(event, template) {
    template.data.data.templateParent.recordToEditId.set(null);
  },
  'documentSubmit': function (event, template, doc) {
    event.preventDefault();
    const userId = Meteor.userId();
    const userRecords = Meteor.user() && Meteor.user().profile.records;
    if (!doc.isNew) {
      const documentId = doc._id;
      delete doc._id;
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
      Records.remove(doc._id);
      Meteor.users.update({
        _id: userId
      }, {
        $push: {'profile.records': doc}
      }, function(error, result) {
        if (!error) {
          Records.insert(doc);
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
  }
})

Template.workRecordEdit.onRendered(function() {
  var self = this;
  console.log("este es el edit",self.data);
  var form = Forms.instance();
  form.doc(Records.findOne({
    _id: self.data.data._id
  }))
})
