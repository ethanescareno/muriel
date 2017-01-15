Template.modal.events({
  'click #saveModal': function(event, templateInstance) {
    if (templateInstance.data.callFunction) {
      templateInstance.data.onSubmit(event, templateInstance)
    }else {
      CSVData.insert({
        type: $('#type').val(),
        title: $('#title').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        company: $('#company').val()
      });
      $('.modal').modal('hide');
    }
  },
  'click #closeModal': function(event, templateInstance) {
    console.log('modal');
  },
  'hidden.bs.modal .modal':function(event,template){
     Blaze.remove(template.view);
   }
});

Template.modal.helpers({
  modalTitle: function() {
    return Template.instance().data.modalTitle;
  },
  templateBody: function() {
    return Template[Template.instance().data.modalToRenderName];
  }
});

Template.modal.onRendered(function() {
  Meteor.setTimeout(function() {
    $('.modal').modal('show');
  }, 500);
})
