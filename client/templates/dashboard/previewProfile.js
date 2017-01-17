Template.previewProfile.helpers({
  userData: function() {
    return Meteor.users.findOne();
  }
})
