Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object

   user.profile.firstName = options.firstName;
   user.profile.lastName = options.lastName;
   user.profile.workStatus = options.workStatus;
   user.profile.zip = options.zip;
   user.profile.phone = options.phone;
   user.profile.createAcct1 = options.createAcct1;
   user.profile.createAcct1 = false;
   user.profile.workRecord = options.workRecord;
   user.profile.workRecord = [];
   user.profile.createAcct2 = options.createAcct2;
   user.profile.createAcct2 = false;
   user.onboard  = {};
   user.onboard.modalDashboard = false;
   user.onboard.profileStep = false;
   user.onboard.linkedin = false;

   // Returns the user object
   return user;
});
