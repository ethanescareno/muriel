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
