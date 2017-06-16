Template.newReview.helpers({
  reviewSubmitted: function() {
    const reviewer = Router.current().params.email;
    const reviewerQuery = Reviews.findOne({reviewerEmail:reviewer});
    if (reviewerQuery) {
      return true;
    }
  },
  userData: function() {
    return Meteor.users.findOne(Router.current().params.userId);
  },
  profilePicture: function() {
    return ProfileImages.findOne({
      'metadata.owner': Router.current().params.userId
    })
  },
  profilePictureExist: function() {

    return ProfileImages.find({
      'metadata.owner': Router.current().params.userId
    }).count() > 0;
  },
  records: function() {
    const user = Meteor.users.findOne(Router.current().params.userId);
    return user && user.profile && user.profile.records;
  },
  recordsExists: function() {
    const user = Meteor.users.findOne(Router.current().params.userId);
    const profile = Meteor.user() && Meteor.user().profile;
    return profile && user.profile.records.length > 0 ? true : false;
  },
  education:function() {
    const user = Meteor.users.findOne(Router.current().params.userId);
    return user && user.profile && user.profile.education;
  },
  educationExists:function() {
    const user = Meteor.users.findOne(Router.current().params.userId);
    return user && user.profile && user.profile.education.length > 0 ? true : false;
  },

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
      modalTitle: 'Thanks for helping us make the recruiting industry better!',
      modalToRenderName: 'modalReview'
    }, document.body);
    const recruiter = Meteor.users.findOne(Router.current().params.userId);
    const email = recruiter && recruiter.profile.p_email;
    Meteor.call('sendEmailReview',
            email,
            'recruiterq2017@gmail.com',
            'You Have a New Review'
            );
  }
})
