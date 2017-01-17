Meteor.publish('userData', function() {
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      'onboard': 1
    }
  });
});

Meteor.publish('userUnique', function(userId) {
  return Meteor.users.find({_id: userId}, {
    fields: {
      'onboard': 1
    }
  });
});
