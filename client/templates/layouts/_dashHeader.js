Template._dashHeader.helpers({
  showOnboardProgress: function() {
    const user = Meteor.user();
    if (user && user.onboard) {
      const linkedinDone = user.onboard.linkedin;
      const profileDone = user.onboard.profileStep;
      return !linkedinDone || !profileDone;
    }
    return true;
  },
  currentStep: function() {
    const user = Meteor.user();
    if (user && user.onboard) {
      const linkedinDone = user.onboard.linkedin;
      const profileDone = user.onboard.profileStep;
      return !profileDone ? 'Step 1 Profile' : 'Step 2 Contacts';
    }
    return 'None';
  },
  currentProgress: function() {
    const user = Meteor.user();
    if (user && user.onboard) {
      const linkedinDone = user.onboard.linkedin;
      const profileDone = user.onboard.profileStep;
      return !profileDone ? 50 : 50
    }
    return 0;
  }
})
