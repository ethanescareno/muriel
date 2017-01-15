ContactsController = AppController.extend({
  layoutTemplate: 'dashLayout',
  onAfterAction: function () {
    Meta.setTitle('Contacts');
  }
});
