Template._dashHeader.helpers({
  showOnboardProgress: function() {
    const user = Meteor.user();
    if (user && user.onboard) {
      const linkedinDone = user.onboard.linkedin;
      const profileDone = user.onboard.profileStep;
      return !linkedinDone || !profileDone;
    }
    return false;
  },
  showProfilePreview: function() {
    return Router.current().route.getName() === 'recruiter-reviews' ? true : false;
  },
  showReview: function() {
    return Router.current().route.getName() !== 'newReview' ? true : false;
  },
  showProfileReviews: function() {
    return Router.current().route.getName() !== 'recruiter-reviews' ? true : false;
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

Template._dashHeader.events({
  'click #lt': function(){
    Blaze.renderWithData(Template.modal, {
      modalTitle: 'This is contact form',
      modalToRenderName: 'longText'
    }, document.body);
  }
})
