Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'postmaster@domain.com',
    password: 'password-goes-here'
  });

  Meteor.methods({
    'sendContactEmail': function(name, email, message) {
      this.unblock();
      const url = Meteor.isProduction ? '67.205.180.89' : 'localhost:3000';
      Meteor.Mailgun.send({
        to: 'recipient@example.com',
        from: name + ' <' + email + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: url, fromName: name, fromEmail: email, message: message})
      });
    }
  });
});
