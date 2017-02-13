Template.newReview.helpers({
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
    Reviews.insert({
      recommend: $('#recommend-rq').prop('checked'),
      use: $('#use-rq').prop('checked'),
      attention: $('#rating-attention').data('userrating'),
      ethic: $('#rating-ethic').data('userrating'),
      communication: $('#rating-communication').data('userrating'),
      time: $('#rating-time').data('userrating'),
      comment: $('#review-comment').val(),
      overall:(($('#rating-attention').data('userrating'))+($('#rating-ethic').data('userrating'))+($('#rating-communication').data('userrating'))+($('#rating-time').data('userrating')))/4,
      publicReview: false,
    });
    Blaze.renderWithData(Template.modal, {
      modalTitle: 'Thanks for helping us make the recruiting industry better! Sincerely, The RecruiterQ Team',
      modalToRenderName: 'longText'
    }, document.body);
  }
})
