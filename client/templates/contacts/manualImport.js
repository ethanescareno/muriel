Forms.mixin(Template.manualImport);

Template.manualImport.events({
  'click #save': function (e, tmpl, doc) {
    CSVData.insert({
      owner: Meteor.userId(),
      type: $('#type').val(),
      title: $('#title').val(),
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      email: $('#email').val(),
      company: $('#company').val(),
      lastSentInvitationDays: 11
    });
    $('.modal').modal('hide');
    const user = Meteor.user();
    const onboard = user.onboard;
    const linkedinDone = onboard.linkedin;
    if (!linkedinDone) {
      Blaze.renderWithData(Template.modal, {
        modalTitle: 'Congratulations! You’ve been successfully onboarded.',
        modalToRenderName: 'longText',
        modalTemplate: 'onBoardingFinishedBody'
      }, document.body);
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'onboard.linkedin': true
        }
      })
    }
  }
});
