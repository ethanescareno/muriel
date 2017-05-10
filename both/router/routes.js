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
});

Router.route('/setup', {
  name: 'setup',
  template: 'account_setup',
});

Router.route('/dashboard/profile', {
  name: 'profile',
  template: 'profile',
  controller: 'ProfileController',
  waitOn: function() {
    Meteor.subscribe('userData');
  },
});

Router.route('/dashboard/contacts', {
  name: 'contacts',
  template: 'contacts',
  controller: 'ContactsController',
  waitOn: function() {
    Meteor.subscribe('userData');
  },
});

Router.route('/recruiter-reviews/:city-:zipcode-:firstName-:lastName-recruiter-q-:userId', {
  name: 'recruiter-reviews',
  template: 'previewProfile',
  controller: 'PreviewProfileController',
  waitOn: function() {
    Meteor.subscribe('userUnique', this.params.userId);
    Meteor.subscribe('userData');
  },
});


Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});

Router.route('/dashborad/account',{
  name: 'account',
  template: 'account',
  // layoutTemplate: 'dashLayout',
  controller: 'ControllerAccount',
  waitOn: function() {
    Meteor.subscribe('userData');
  },
});

Router.route('/dashborad/invites',{
  name: 'invites',
  template: 'invites',
  // layoutTemplate: 'dashLayout',
  controller: 'InvitesController',
  waitOn: function() {
    Meteor.subscribe('userData');
  },
});

Router.route('/recruiter/:firstName-:lastName-recruiter-q-:userId/review/:email', {
  name: 'newReview',
  template: 'newReview',
  controller: 'NewReviewController',
  waitOn: function() {
    Meteor.subscribe('userUnique', this.params.userId);
    Meteor.subscribe('userData');
  },
});

Router.route('/dashborad/reviews',{
  name: 'reviews',
  template: 'reviews',
  // layoutTemplate: 'dashLayout',
  controller: 'ReviewsController',
  waitOn: function() {
    Meteor.subscribe('userData');
  },
});
