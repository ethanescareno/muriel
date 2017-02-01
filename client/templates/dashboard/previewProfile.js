Template.previewProfile.helpers({
  userData: function() {
    return Meteor.users.findOne();
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
