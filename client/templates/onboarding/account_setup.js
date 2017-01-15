Template.account_setup.events({
    "blur .updateField": function(evt, tpl) {
        //onChangesetupAccount(evt, Meteor.userId());
    },
    "click .setUpSubmit": function(e) {

        
        userId = Meteor.userId();

        var firstName = $("#fName").val();
        var lastName = $("#lName").val();
        var workSitch = $("#workStatus").val();
        var zip = $("#zip").val();
        var phone = $("#phone").val();

        if (!firstName){
            return FlashMessages.sendWarning("Please provide input for first name");
        }
        if (!lastName){
            return FlashMessages.sendWarning("Please provide input for last name");
        }

        if (!workSitch){
            return FlashMessages.sendWarning("Please provide input for current work status");
        }
        if (!zip){
            return FlashMessages.sendWarning("Please provide input for zip");
        }
        if (!phone){
            return FlashMessages.sendWarning("Please provide input for phone");
        }

       Meteor.users.update(userId, { $set: {"profile.firstName": firstName, "profile.lastName": lastName, "profile.workStatus": workSitch, "profile.zip": zip, "profile.phone": phone, "profile.createAcct1": true} });

       Router.go("/dashboard/home");
       
    }
})