Forms.mixin(Template.manualImport);

Template.manualImport.events({
  'click #save': function (e, tmpl, doc) {
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
});
