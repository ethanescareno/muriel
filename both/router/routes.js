checkUserOnboard = function() {
  const isOnline = Meteor.loggingIn() || Meteor.user();
  if (isOnline) {
    const user = Meteor.user();
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
        this.render('profile');
      } else if (!linkedinPassed) {
        this.render('contacts');
      } else {
        this.next();
      }
    }
  }
};

Router.route('/', {
  name: 'home',
  controller: 'AppController'
});

Router.route('/dashboard/home', {
  name: 'dashhome',
  template: 'dashhome',
  controller: 'DashboardController',
  waitOn: function() {
    Meteor.subscribe('userData');
  },
  onBeforeAction: checkUserOnboard
});

Router.route('/setup', {
  name: 'setup',
  template: 'account_setup',
});

Router.route('/dashboard/profile', {
  name: 'profile',
  template: 'profile',
  controller: 'ProfileController',
  onBeforeAction: checkUserOnboard
});

Router.route('/dashboard/contacts', {
  name: 'contacts',
  template: 'contacts',
  controller: 'ContactsController',
  onBeforeAction: checkUserOnboard
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
