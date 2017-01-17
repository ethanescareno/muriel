Template.dashLayout.helpers({
  onboardingComplete: function() {
    const user = Meteor.user();
    if (!user) {
      return;
    }
    const onboard = user && user.onboard;

    if (!onboard) {
      return;
    }
    const profileDone = onboard.profileStep;
    const textDone = onboard.modalDashboard;
    const linkedinDone = onboard.linkedin;
    return profileDone && textDone && linkedinDone;
  }
})

Template.dashLayout.onRendered(function() {
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
            modalTitle: 'Please Read Careful',
            modalToRenderName: 'longText'
          }, document.body);
        } else if (!profilePassed) {
          Router.go('profile');
        } else if (!linkedinPassed) {
          Router.go('contacts');
        }
      }
    }
  })
})
