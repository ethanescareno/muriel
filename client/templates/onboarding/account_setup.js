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
        const industries = $('#industries').val();

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

       Meteor.users.update(userId, { $set: {
        "profile.firstName": firstName,
        "profile.lastName": lastName,
        "profile.workStatus": workSitch,
        "profile.zip": zip,
        "profile.phone": phone,
        "profile.createAcct1": true,
        "profile.industries": industries
      } });

       Router.go("/dashboard/home");

    }
});


Template.account_setup.onRendered(function(){
  $('#industries').multiselect({
    buttonWidth: '100%',
    maxHeight: 200,
    onChange: function(option, checked) {
      const industries = $('#industries').val();
      if (industries.length >= 3) {
        // Disable all other checkboxes.
        const industriesNonSelectedOptions = $('#industries option').filter(function() {
            return !$(this).is(':selected');
        });

        industriesNonSelectedOptions.each(function() {
            var input = $('input[value="' + $(this).val() + '"]');
            input.prop('disabled', true);
            input.parent('li').addClass('disabled');
        });
      }
    }
  });
})
