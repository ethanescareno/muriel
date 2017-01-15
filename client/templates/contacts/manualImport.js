Forms.mixin(Template.manualImport);

Template.manualImport.events({
  'documentSubmit': function (e, tmpl, doc) {
    doc.owner = Meteor.userId();
    console.log(tmpl);
  }
});
