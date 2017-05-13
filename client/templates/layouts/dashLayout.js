Template.dashLayout.helpers({
  showProfilePreview: function() {
    return Router.current().route.getName() !== 'recruiter-reviews' ? true : false;
  },
  showNewReview: function() {
    return Router.current().route.getName() !== 'newReview' ? true : false;
  },
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
  },
  isActive: function(name){
    return Router.current().route.getName() === name ? 'background-color: #12dbbc; color: #fff;' : '';
  }
})

Template.dashLayout.onRendered(function() {
  var self = this;
  this.autorun(function() {
    const user = Meteor.user();
    if (user) {
      const onboarding = user && user.onboard;
      if (onboarding) {
        const profilePassed = onboarding.profileStep;
        const linkedinPassed = onboarding.linkedin;
        if (!profilePassed) {
          Router.go('profile');
        } else if (!linkedinPassed) {
          Router.go('contacts');
        }
      }
    }
  })
})
Template.dashLayout.events({
  'click .activeUser': function(event){
    event.preventDefault();
    const goRoute = $(event.currentTarget).attr('id');
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
    if (profileDone && textDone && linkedinDone) {
      if (goRoute == 'contacts') {
        Router.go('contacts');
      } else if (goRoute == 'account') {
        Router.go('account');
      }else if (goRoute == 'invites') {
        Router.go('invites');
      }else if (goRoute == 'reviews') {
        Router.go('reviews');
      }
    } else {
      Blaze.renderWithData(Template.modal, {
        modalTitle: 'Please Complete Your Profile',
        modalToRenderName: 'longText'
      }, document.body);
    }
  }
})
