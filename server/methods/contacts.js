console.log(Contacts.find().count());
Meteor.methods({
  insertContacts: function(contacts) {
    contacts.forEach(function(cont) {
      Contacts.insert(cont);
    })
  }
})
