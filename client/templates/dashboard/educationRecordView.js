Template.educationRecordView.helpers({
  education: function() {
    console.log(Template.instance().data);
    return Template.instance().data.data;
  }
})
