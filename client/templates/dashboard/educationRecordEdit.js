Forms.mixin(Template.educationRecordEdit);

Template.educationRecordEdit.events({
  'click #cancelEdit': function(event, template) {
    template.data.data.templateParent.educationToEditId.set(null);
  },
  'documentSubmit': function (event, template, doc) {
    event.preventDefault();
    const userId = Meteor.userId();
    const userEducation = Meteor.user() && Meteor.user().profile.education;
    if (!doc.isNew) {
      const documentId = doc._id;
      delete doc._id;
      Education.update(
        documentId, {
          $set: doc
        }
      );
      Meteor.users.update({
        _id: userId
      }, {
        $set: {'profile.education': Education.find().fetch()}
      }, function(error, result) {
        if (!error) {
          template.data.data.templateParent.educationToEditId.set(null);
        }
      });
    } else {
      doc.isNew = false;
      Education.remove(doc._id);
      Meteor.users.update({
        _id: userId
      }, {
        $push: {'profile.education': doc}
      }, function(error, result) {
        if (!error) {
          Education.update(
            documentId, {
              $set: doc
            }
          );
          template.data.data.templateParent.educationToEditId.set(null);
        }
      });
    }
    },
  'click #delete': function(event, template) {
    Education.remove({
      _id: templateInstance.data._id
    });
    template.data.data.templateParent.educationToEditId.set(null);
  },
})


Template.educationRecordEdit.helpers({
  education: function() {
    return Template.instance().data.data;
  }
})

Template.educationRecordEdit.onRendered(function() {
  var self = this;
  var form = Forms.instance()
  form.doc(Education.findOne({
    _id: self.data.data._id
  }))
})
