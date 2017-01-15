Template.workRecordView.helpers({
  record: function() {
    console.log(Template.instance().data.data);
    return Template.instance().data.data;
  }
})
