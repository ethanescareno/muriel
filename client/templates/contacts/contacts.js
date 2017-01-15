CSVData = new Mongo.Collection(null);

Template.contacts.events({
  'change .typeContactSelect': function(event, target) {
    const idToUpdate = $(event.target).data().id;
    const newType = $(event.target).val();
    CSVData.update({
      _id: idToUpdate
    }, {
      $set: {
        type: newType
      }
    })
  },
  'click #openManualImport': function(event, template) {
    Blaze.renderWithData(Template.modal, {
      modalTitle: 'Manual Import Contacts',
      modalToRenderName: 'manualImport',
      callFunction: false
    }, document.body);
  },
  'click #saveData': function() {
    Meteor.call('insertContacts', CSVData.find().fetch(), function(error, result){
      if (error) {
        console.log(error);
      } else {
        const user = Meteor.user();
        const onboard = user.onboard;
        const linkedinDone = onboard.linkedin;
        if (!linkedinDone) {
          Meteor.users.update({
            _id: Meteor.userId()
          }, {
            $set: {
              'onboard.linkedin': true
            }
          })
        }
        CSVData.remove({});
      }
    })
  }
})

Template.contacts.helpers({
  tabs: function () {
    return [
      { name: 'Companies', slug: 'companies' },
      { name: 'Candidates', slug: 'candidates' },
      { name: 'Unfiltered', slug: 'unfiltered' }
    ];
  },
  activeTab: function () {
    return Session.get('activeTab') || 'unfiltered';
  },
  csvData: function() {
    return CSVData.find()
  },
  showTabs: function() {
    return CSVData.find().count() > 0
  }
})

var readFile = function(file, callback) {
  Papa.parse(file, {
	   complete: callback
   });
};

var uploadCSV = function(file) {
  var fileType = file.type;
  var isCSV = fileType === 'text/csv';
  if (isCSV) {
    readFile(file, function(result)  {
      var error = result.errors;
      var haveErrors = error.length > 0;
      if (haveErrors) {
        console.log(error);
      } else {
        var data = result.data;
        var recordsFound = data.length;
        data.splice(0, 1);
        data.forEach(function(contact) {
          CSVData.insert({
            title: contact[0] || 'No Title',
            firstName: contact[1] || 'No First Name',
            lastName: contact[3] || 'No Last Name',
            email: contact[5] || 'No Email',
            company: contact[29] || 'No Company',
            type: 'companie',
            owner: Meteor.userId()
          })
        });
        Dropzone.forElement("#dropzoneDiv").removeAllFiles(true);
      }
    })
  } else {
    // toastr.error('Please upload a CSV');
  }
}

Template.contacts.onRendered(function () {
  Meteor.setTimeout(function(){
    $("#dropzoneDiv").dropzone({
      url: 'none',
      maxFiles: 1,
      accept: function(file, done) {
        uploadCSV(file);
      }
    });
  })
});

Template.contacts.onCreated(function () {
  var self = this;
  self.activeTab = new ReactiveVar(null)
  self.csvData = new ReactiveVar(null)
});
