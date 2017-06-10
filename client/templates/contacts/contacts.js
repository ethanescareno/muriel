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
  'click #bulkImport': function(){
    window.open('https://www.linkedin.com/people/export-settings?exportNetwork=Export&outputType=microsoft_outlook','linkedin','resizable,height=420,width=640');
  },
  'click #openManualImport': function(event, template) {
    Blaze.renderWithData(Template.modal, {
      modalTitle: 'Manual Contact Import',
      modalToRenderName: 'manualImport',
      callFunction: false
    }, document.body);
  },
  'change .typeContactSelect': function (e, t) {
    const current = $(e.currentTarget);
    const _id = this._id;
    CSVData.update({_id: _id}, {
      $set: {
        type: current.val()
      }
    }, function(e,r){
      if (!e) {
        console.log("si guardo");
      }
    });
  },
  'click #editCompany': function(event, templateInstance) {
    console.log('si jala');
    templateInstance.contactToEditId.set(this._id)
  },
  'click #editCandidate': function(event, templateInstance) {
    console.log('si jala');
    templateInstance.contactToEditId.set(this._id)
  },
  'click #deleteCompany': function(event, templateInstance) {
    CSVData.remove({_id: this._id})
  },
  'click #deleteCandidate': function(event, templateInstance) {
    CSVData.remove({_id: this._id})
  },
  'click #saveData': function() {
    const contacts = CSVData.find().fetch();
    contacts.forEach(function(cont) {
      const currentCont = cont
      Contacts.insert(cont, function(e, result){
        if (e) {
            console.log(e);
          } else {
            const user = Meteor.user();
            const onboard = user.onboard;
            const linkedinDone = onboard.linkedin;
            if (!linkedinDone) {
              Blaze.renderWithData(Template.modal, {
                modalTitle: 'Congratulations! You’ve been successfully onboarded.',
                modalToRenderName: 'longText',
                modalTemplate: 'onBoardingFinishedBody'
              }, document.body);
              Meteor.users.update({
                _id: Meteor.userId()
              }, {
                $set: {
                  'onboard.linkedin': true
                }
              })
            }
            CSVData.remove(currentCont._id);
          }
      });
    });
    // Meteor.call('insertContacts', CSVData.find().fetch(), function(error, result){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     const user = Meteor.user();
    //     const onboard = user.onboard;
    //     const linkedinDone = onboard.linkedin;
    //     if (!linkedinDone) {
    //       Meteor.users.update({
    //         _id: Meteor.userId()
    //       }, {
    //         $set: {
    //           'onboard.linkedin': true
    //         }
    //       })
    //     }
    //     CSVData.remove({});
    //   }
    // });
    FlashMessages.sendInfo("Contacts saved.");
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
  // csvData: function() {
  //   return CSVData.find()
  // },
  showContactEdit: function() {
    console.log(this.isNew, Template.instance().contactToEditId.get() === this._id, this._id);
    return this.isNew || Template.instance().contactToEditId.get() === this._id;
  },
  contactData: function() {
    var data = this;
    data.templateParent = Template.instance();
    return data;
  },
  showTabs: function() {
    return CSVData.find().count() > 0
  },
  isReady: function () {
      return Template.instance().pagination.ready();
  },
  templatePagination: function () {
      return Template.instance().pagination;
  },
  templatePaginationCandidates: function () {
      return Template.instance().paginationCandidates;
  },
  templatePaginationCompanies: function () {
      return Template.instance().paginationCompanies;
  },
  csvData: function () {
      return Template.instance().pagination.getPage();
  },
  candidates: function () {
      return Template.instance().paginationCandidates.getPage();
  },
  companies: function () {
      return Template.instance().paginationCompanies.getPage();
  },
  unfiltered: function () {
      return Template.instance().paginationCompanies.getPage();
  },
  selected: function (option) {
      return this.type === option ? 'selected' : '';
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
          console.log(contact);
          CSVData.insert({
            title: contact[3] || 'No Title',
            firstName: contact[0] || 'No First Name',
            lastName: contact[1] || 'No Last Name',
            email: contact[4] || 'No Email',
            company: contact[2] || 'No Company',
            type: '',
            owner: Meteor.userId(),
            lastSentInvitationDays: 11
          })
        });
        Dropzone.forElement("#dropzoneDiv").removeAllFiles(true);
        const user = Meteor.user();
        const onboard = user.onboard;
        const linkedinDone = onboard.linkedin;
        if (!linkedinDone) {
          Blaze.renderWithData(Template.modal, {
            modalTitle: 'Congratulations! You’ve been successfully onboarded.',
            modalToRenderName: 'longText',
            modalTemplate: 'onBoardingFinishedBody'
          }, document.body);
          Meteor.users.update({
            _id: Meteor.userId()
          }, {
            $set: {
              'onboard.linkedin': true
            }
          })
        }
      }
    })
  } else {
    // toastr.error('Please upload a CSV');
  }
}

Template.contacts.onRendered(function () {
  var self = this;
  Meteor.setTimeout(function(){
    $("#dropzoneDiv").dropzone({
      url: 'none',
      maxFiles: 1,
      accept: function(file, done) {
        uploadCSV(file);
      }
    });
  })

  this.autorun(function() {
    const user = Meteor.user();
    if (user) {
      const onboarding = user && user.onboard;
      if (onboarding) {
        const modalPassed = onboarding.modalDashboard;
        const profilePassed = onboarding.profileStep;
        const linkedinPassed = onboarding.linkedin;
        if (!modalPassed) {
          Blaze.renderWithData(Template.modal, {
            onSubmit: function(event, templateInstance) {
              Meteor.call('updateModalUser');
              $('.modal').modal('hide');
            },
            modalTitle: 'Please Read Careful',
            modalToRenderName: 'longText'
          }, document.body);
        } else if (!profilePassed) {
          Router.go('profile');
        } else if (!linkedinPassed) {
          Router.go('contacts');
        }
      }
    }
  })
});

Template.contacts.onCreated(function () {
  var self = this;
  self.contactToEditId = new ReactiveVar(null)
  self.activeTab = new ReactiveVar(null)
  self.csvData = new ReactiveVar(null)
  this.pagination = new Meteor.Pagination(CSVData, {
        filters: {
          type: { $nin: ['company', 'candidate']}
        },
        sort: {
            _id: -1
        },
        perPage: 30
    });
  this.paginationCandidates = new Meteor.Pagination(CSVData, {
        filters: {
          type: 'candidate'
        },
        sort: {
            _id: -1
        },
        perPage: 30,
    });
    this.paginationCompanies = new Meteor.Pagination(CSVData, {
          filters: {
            type: 'company'
          },
          sort: {
              _id: -1
          },
          perPage: 30,
      });
});
