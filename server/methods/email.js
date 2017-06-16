Meteor.methods({
  sendEmail: function (to, from, subject, emailData) {
    check([to, from, subject,], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));
    var user = Meteor.users.findOne({ _id: this.userId });
    var email = user && user.emails[0] && user.emails[0].address;
    var url = Meteor.isProduction ? '67.205.180.89' : 'localhost:3000';
    emailData.url = url;
    Template.htmlEmail.helpers({
      user: function() {
        return email;
      }
    });

    Email.send({
      to: to,
      from: 'ridgetopat.com',
      subject: subject,
      html: SSR.render('htmlEmail', emailData),
    });
  },
  sendEmailReview: function (to, from, subject) {
    check([to, from, subject,], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    SSR.compileTemplate('htmlEmail', Assets.getText('html-emailReview.html'));
    Email.send({
      to: 'ethan.rosanoo@gmail.com',//to,
      from: from,
      subject: subject,
      // text: text,
      html: SSR.render('htmlEmail'),
    });
  }
});
