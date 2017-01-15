Forms.mixin(Template.profile);

function profilePassedGood(user) {
  console.log(user);
  return true;
}

Template.profile.events({
  'click .saveProfile': function (event, templateInstance, doc) {
    event.preventDefault()
    var newData = {
      profile: {
        blurb: $(".blurbtxt").val(),
        p_phone: $('#p-phone').val(),
        p_email: $('#p-email').val(),
        p_website: $('#p-website').val(),
        p_linkedin: $('#p-linkedin').val(),
        mresume: $('#mResume').val(),
      },
      onboard: {
        modalDashboard: Meteor.user().onboard.modalDashboard || false,
        linkedin: Meteor.user().onboard.linkedin || false
      }
    };

    newData.onboard.profileStep = profilePassedGood(Meteor.user());
    console.log(newData);
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: newData
    }, function(error, result) {
      if (error) {
        FlashMessages.sendInfo(error.message);
      } else {
        FlashMessages.sendInfo("Profile saved.");
      }
    });
  }
});

Template.profile.helpers({
    "userinfo": function() {
        return Meteor.users.findOne() || {};
    },
});
