ProfileController = AppController.extend({
  layoutTemplate: 'dashLayout',
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});
