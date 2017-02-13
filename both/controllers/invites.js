InvitesController = AppController.extend({
  layoutTemplate: 'dashLayout',
  onAfterAction: function () {
    Meta.setTitle('Invites');
  }
});
