Template.modalReview.events({
  'click #clickedOK': function(event, template) {
    Meteor.call('updateModalUser');
    $('.modal').modal('hide');
    if($('#accessNetwork').prop('checked')){
      Router.go('profile');
    }else{
    Router.go('home');
    }
  }
})
