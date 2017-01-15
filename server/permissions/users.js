Meteor.users.allow({
  'insert': function(userId, doc) {
    return doc._id === userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return doc._id === userId;;
  },
  'remove': function(userId, doc) {
    return doc._id === userId;;
  }
});
