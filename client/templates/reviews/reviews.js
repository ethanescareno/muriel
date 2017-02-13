Template.reviews.helpers({
  reviews: function() {
    return Reviews.find();
  },
  userq: function() {
    return this.use == true ? true : false
  },
  recommendrq: function() {
    return this.recommend == true ? true : false
  },
})

Template.reviews.events({
  'click #publicReview': function() {
    console.log('si entra');
    const reviewId = this._id;
    const publicReview = this.publicReview;
    if (!publicReview) {
      Blaze.renderWithData(Template.modal, {
        modalTitle: 'This review is on your Public Profile.',
        modalToRenderName: 'longText'
      }, document.body);
      Reviews.update({
        _id: reviewId
      }, {
        $set: {
          'publicReview': true
        }
      })
    }
  }

})
