
// process.env.MAIL_URL = "smtp://postmaster%40sandboxfde5267372b2461ebfa3c3f86efd100f.mailgun.org:27b6ad25bd62720b84b9092f26e45d9a@smtp.mailgun.org:587";
Meteor.startup(function () {
  const smtp = {
    username: 'postmaster@ridgetopat.com', //'recruiterq2017@gmail.com',
    password: 'db87f5284d149f0f813bd499510e3de0', //'RecruiterQ1',
    server: 'smtp.mailgun.org',//'smtp.gmail.com',
    port: 465
  }
  process.env.MAIL_URL = `smtp://${encodeURIComponent(smtp.username)}:${encodeURIComponent(smtp.password)}@${encodeURIComponent(smtp.server)}:${smtp.port}`;
})
