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
  activeProfile: function() {
    const user = Meteor.user();
    if (user && user.onboard) {
      // const linkedinDone = user.onboard.linkedin;
      const profileDone = user.onboard.profileStep;
      return !profileDone ? 'activeProfile' : null;
    }
    return 0;
  },
  activeContacts: function() {
    const user = Meteor.user();
    if (user && user.onboard) {
      // const linkedinDone = user.onboard.linkedin;
      const profileDone = user.onboard.profileStep;
      return profileDone ? 'activeContacts' : null;
    }
    return 0;
  }
})
