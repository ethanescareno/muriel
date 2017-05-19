Template.dashhome.rendered = function() {
  var self = this;
  this.autorun(function() {
    const user = Meteor.user();
    if (user) {
      const onboarding = user && user.onboard;
      if (onboarding) {
        const modalPassed = onboarding.modalDashboard;
        const profilePassed = onboarding.profileStep;
        const linkedinPassed = onboarding.linkedin;
        if (!modalPassed) {
          Blaze.renderWithData(Template.modal, {
            onSubmit: function(event, templateInstance) {
              Meteor.call('updateModalUser');
              $('.modal').modal('hide');
            },
            modalTitle: 'Welcome to RecruiterQ!',
            modalToRenderName: 'longText',
            modalTemplate: 'modalDashboardBody',
            style: "color: #e56e07; text-align: center;",
            buttonText: 'Ok to Got it!',
          }, document.body);
        }
      }
    }
  })
};
