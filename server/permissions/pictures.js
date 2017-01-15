ProfileImages.allow({
    download: function(userId, fileObj) {
        return true
    },
    'insert': function(userId, doc) {
      return userId;
    },
    'update': function(userId, doc, fields, modifier) {
      return doc.metadata.owner === userId;
    },
    'remove': function(userId, doc) {
      return doc.metadata.owner === userId;
    }
})
