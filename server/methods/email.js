Meteor.methods({
  sendEmail: function (to, from, subject, emailData) {
    check([to, from, subject,], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));
    Email.send({
      to: to,
      from: from,
      subject: subject,
      // text: text,
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
      to: to,
      from: from,
      subject: subject,
      // text: text,
      html: SSR.render('htmlEmail'),
    });
  }
});
