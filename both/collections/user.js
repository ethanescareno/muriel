// export const User = Meteor.users;

// User.Model = function(user) {
//     if (!user)
//         user = {};
//     // user.username="";
//     user.email = ""
//     user.password = "";

//     user.profile = {};
//     user.profile.firstName = "";
//     user.profile.lastName = "";
//     user.profile.profilePicture = Gravatar.imageUrl(user.email, { secure: true, default: 'mm'});
//     user.profile.accountSetupComplete = false;
//     user.profile.isComplete = false;
//     user.profile.workStatus = "";
//     user.profile.phone = "";
//     user.profile.zip = "";

//     user.profile.titles = {}
//     user.profile.titles.salutation = "";
//     user.profile.titles.title = "";
//     user.profile.titles.job_title = "";

//     user.profile.contact = {};
//     user.profile.contact.organization = "";
//     user.profile.contact.phone_cell = "";
//     user.profile.contact.phone_office1 = "";
//     user.profile.contact.phone_office2 = "";
//     user.profile.contact.fax = "";

//     user.profile.address = {};
//     user.profile.address.address1 = "";
//     user.profile.address.address2 = "";
//     user.profile.address.address3 = "";
//     user.profile.address.city = "";
//     user.profile.address.state = "";
//     user.profile.address.country = "";
//     user.profile.address.postal_code = "";
//     user.profile.team = [];

//     return user;
// }
// Meteor.users.allow({
//     insert: function() {
//         if (Meteor.isClient)
//             return false;
//         else
//             return true;
//     },
//     update: function(userId, doc, fields, modifier) {
//         if (userId == this.userId)
//             return true;
//         else
//             return false;

//     },
//     remove: function() {
//         return false;
//     }
// });
// // Meteor.users.deny({
// //     insert: function() {
// //         return true;
// //     },
// //     update: function(userId, doc, fields, modifier) {

// //         check(userId, String);
// //         check(doc, Object);
// //         check(fields, Array);
// //         check(modifier, Object);

// //         return true;

// //     },
// //     remove: function() {
// //         return true;
// //     }
// // });

// User.helpers({
//     "full_name": function() {
//         var full_name = (lookup(this, "profile.firstName") || "") + " " + (lookup(this, "profile.lastName") || "");
//         var salutation = lookup(this, "profile.titles.salutation") || "";
//         if (salutation)
//             full_name += " , " + salutation;
//         return full_name;
//     }
// });
