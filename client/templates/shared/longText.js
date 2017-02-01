Template.longText.events({
  'click #clickedOK': function(event, template) {
    Meteor.call('updateModalUser');
    $('.modal').modal('hide');
    // Router.go('profile')
  }
})
