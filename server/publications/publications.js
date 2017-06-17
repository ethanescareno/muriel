new Meteor.Pagination(CSVData);

Meteor.publish('reviewers', function(userId) {
  return CSVData.find({onwner: userId});
});
