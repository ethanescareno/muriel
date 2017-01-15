Meteor.methods({
  updateModalUser: function() {
    return Meteor.users.update({
      _id: this.userId,
    }, {
      $set: {
        'onboard.modalDashboard': true
      }
    });
  }
});
