ProfileController = AppController.extend({
  layoutTemplate: 'dashLayout',
  onAfterAction: function () {
    Meta.setTitle('Profile');
  }
});

PreviewProfileController = AppController.extend({
  layoutTemplate: 'dashLayout',
  onAfterAction: function () {
    Meta.setTitle('Preview');
  }
});
