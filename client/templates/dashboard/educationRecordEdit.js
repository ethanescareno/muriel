Forms.mixin(Template.educationRecordEdit);

Template.educationRecordEdit.events({
  'click #cancelEdit': function(event, template) {
    template.data.data.templateParent.educationToEditId.set(null);
  },
  'documentSubmit': function (event, template, doc) {
      doc.isNew = false
      delete doc._id
      Education.update({
        _id: template.data.data._id
      }, {
        $set: doc
      }, function(error, result) {
        if (error) {
          alert(error)
        } else {
          template.data.data.templateParent.educationToEditId.set(null);
        }
      })
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
