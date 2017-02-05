Forms.mixin(Template.contactEdit);

Template.contactEdit.events({
  'click #cancelEdit': function(event, template) {
    template.data.data.templateParent.contactToEditId.set(null);
  },
  'documentSubmit': function (event, template, doc) {
    console.log("entro", doc);
    event.preventDefault();
    const userId = Meteor.userId();
    // const userRecords = Meteor.user() && Meteor.user().profile.records;
    const documentId = doc._id;
    delete doc._id;
    if (!doc.isNew) {
      console.log("edit");
      CSVData.update(
        documentId, {
          $set: doc
        }
      );
      Meteor.users.update({
        _id: userId
      }, {
        $set: {'profile.csvData': CSVData.find().fetch()}
      }, function(error, result) {
        if (!error) {
          template.data.data.templateParent.contactToEditId.set(null);
        }
      });
    } else {
      console.log("new");
      doc.isNew = false;
      Meteor.users.update({
        _id: userId
      }, {
        $push: {'profile.csvData': doc}
      }, function(error, result) {
        if (!error) {
          CSVData.update(
            documentId, {
              $set: doc
            }
          );
          template.data.data.templateParent.contactToEditId.set(null);
        }
      });
    }
   },
  'click #delete': function(event, templateInstance) {
    CSVData.remove({
      _id: templateInstance.data._id
    });
    templateInstance.data.data.templateParent.contactToEditId.set(null);
  },
})


Template.contactEdit.helpers({
  CSVData: function() {
    return Template.instance().data.data;
  }
})

Template.contactEdit.onRendered(function() {
  var self = this;
  // console.log("este es el edit",self.data);
  var form = Forms.instance();
  form.doc(CSVData.findOne({
    _id: self.data.data._id
  }))
})
