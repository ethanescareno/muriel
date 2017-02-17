Template.newReview.helpers({
  reviewSubmitted: function() {
    const reviewer = Router.current().params.email;
    const reviewerQuery = Reviews.findOne({reviewerEmail:reviewer});
    if (reviewerQuery) {
      return true;
    }
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
    return user.education.length > 0 ? true : false;  },

})

Template.newReview.events({
  'click #submitReview': function(){
    const reviewer = Router.current().params.email;
    const reviewerQuery = CSVData.findOne({email:reviewer});
    const user = Router.current().params.userId;
    Reviews.insert({
      user: user,
      recommend: $('#recommend-rq').prop('checked'),
      use: $('#use-rq').prop('checked'),
      attention: $('#rating-attention').data('userrating'),
      ethic: $('#rating-ethic').data('userrating'),
      communication: $('#rating-communication').data('userrating'),
      time: $('#rating-time').data('userrating'),
      comment: $('#review-comment').val(),
      overall:(($('#rating-attention').data('userrating'))+($('#rating-ethic').data('userrating'))+($('#rating-communication').data('userrating'))+($('#rating-time').data('userrating')))/4,
      publicReview: false,
      reviewerEmail: reviewer,
      reviewerFirstName: reviewerQuery.firstName,
      reviewerLastName: reviewerQuery.lastName,
      reviewerType: reviewerQuery.type
    });
    Blaze.renderWithData(Template.modal, {
      modalTitle: 'Thanks for helping us make the recruiting industry better! Sincerely, The RecruiterQ Team',
      modalToRenderName: 'modalReview'
    }, document.body);
    Meteor.call('sendEmailReview',
            Meteor.user().profile.p_email,
            'recruiterq2017@gmail.com',
            'You Have a New Review'
            );
  }
})
