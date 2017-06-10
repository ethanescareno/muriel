AppController = RouteController.extend({
  layoutTemplate: 'appLayout',
  onBeforeAction: function (route) {
    if (Meteor.userId() && route.url === '/') {
      this.redirect('dashhome');
    } else {
      this.next();
    }
  }
});

AppController.events({
  'click [data-action=logout]' : function() {
    AccountsTemplates.logout();
  }
});
