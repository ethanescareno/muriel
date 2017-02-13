ReviewsController = AppController.extend({
  layoutTemplate: 'dashLayout',
  onAfterAction: function () {
    Meta.setTitle('Reviews');
  }
});
