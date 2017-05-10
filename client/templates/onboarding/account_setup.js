var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

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
        const city = $("#city").val();
        const state = $("#state").val();

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

        if (!city){
            return FlashMessages.sendWarning("Please provide input for city");
        }

        if (!state){
            return FlashMessages.sendWarning("Please provide input for state");
        }

       Meteor.users.update(userId, { $set: {
        "profile.firstName": firstName,
        "profile.lastName": lastName,
        "profile.workStatus": workSitch,
        "profile.zip": zip,
        "profile.phone": phone,
        "profile.createAcct1": true,
        "profile.industries": industries,
        "profile.city": city,
        "profile.state": state,
      } });

       Router.go("/dashboard/home");

    }
});

Template.account_setup.helpers({
  states: function(){
    console.log(states);
    return states;
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
