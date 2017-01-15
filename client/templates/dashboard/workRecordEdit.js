Forms.mixin(Template.workRecordEdit);

Template.workRecordEdit.events({
  'click #cancelEdit': function(event, template) {
    template.data.data.templateParent.recordToEditId.set(null);
  },
  'documentSubmit': function (event, template, doc) {
      doc.isNew = false
      delete doc._id
      console.log(doc);
      console.log(template.data.data._id);
      Records.update({
        _id: template.data.data._id
      }, {
        $set: doc
      }, function(error, result) {
        if (error) {
          alert(error)
        } else {
          template.data.data.templateParent.recordToEditId.set(null);
        }
      })
   },
  'click #delete': function(event, template) {
    Records.remove({
      _id: templateInstance.data._id
    });
    template.data.data.templateParent.recordToEditId.set(null);
  },
})


Template.workRecordEdit.helpers({
  record: function() {
    return Template.instance().data.data;
  }
})

Template.workRecordEdit.onRendered(function() {
  var self = this;
  var form = Forms.instance()
  form.doc(Records.findOne({
    _id: self.data.data._id
  }))
})