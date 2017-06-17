Template.previewProfile.helpers({
  yearEndText: function(data) {
    const { workHere, yearEnd } = data;
    return workHere ? 'present' : yearEnd;
  },
  reviewIsPublic: function() {
    const user = Router.current().params.userId;
    return Reviews.find({
      user: user,
      publicReview: true
    }).fetch();
  },
  recruiterRating: function() {
    const user = Router.current().params.userId;
    const userReviews = Reviews.find({
      user: user,
      publicReview: true
    }).fetch();
    let userReviewsTotal = 0;
    userReviews.forEach(function(e){
      userReviewsTotal += e.overall;
    });
    return userReviewsTotal / userReviews.length;
  },
  reviews: function() {
    return Reviews.find();
  },
  userData: function() {
    return Meteor.user();
  },
  profilePicture: function() {
    return ProfileImages.findOne({
      'metadata.owner': Meteor.userId()
    })
  },
  profilePictureExist: function() {

    return ProfileImages.find({
      'metadata.owner': Meteor.userId()
    }).count() > 0;
  },
  records: function() {
    const user = Meteor.user() && Meteor.user().profile
    return user.records;
  },
  recordsExists: function() {
    const user = Meteor.user() && Meteor.user().profile;
    return user.records.length > 0 ? true : false;
  },
  education:function() {
    const user = Meteor.user() && Meteor.user().profile
    return user.education;  },
  educationExists:function() {
    const user = Meteor.user() && Meteor.user().profile;
    return user.education.length > 0 ? true : false;
  },
  isCompany:function() {
    return this.reviewerType === 'company';
  },
  reviewerData:function() {
    return CSVData.findOne({
      email: this.reviewerEmail,
      type: 'company',
    });
  }
})
