AccountsTemplates.configureRoute('signIn', {
	layoutTemplate: 'appLayout',
	 redirect: function(){
        var user = Meteor.user();
        if (user.profile.createAcct1) {
          Router.go('/dashboard/home');
        } else {
          Router.go('/setup');
        }
    }
	//redirect:'/dashboard'
});


AccountsTemplates.configure({
	defaultLayout: 'appLayout',
  showForgotPasswordLink: true,
	enablePasswordChange: true,
});


AccountsTemplates.configureRoute('signUp', {
	layoutTemplate: 'appLayout',
	redirect:'/setup',
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});
