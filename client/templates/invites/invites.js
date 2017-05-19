Template.invites.events({
  'click #sendInvitesCandidates': function(){
    event.preventDefault();
    const emails = $('.checkbox-candidates:checked')
    const emailData = {
      firstName: Meteor.user().profile.firstName,
      lastName: Meteor.user().profile.lastName,
      userId: Meteor.userId(),
      }
    emails.each(function() {
      emailData.email = $(this).val();
        Meteor.call('sendEmail',
                $(this).val(),
                'recruiterq2017@gmail.com',
                `What’s your opinion on ${emailData.firstName} ${emailData.lastName} ?`,
                emailData
                );
        CSVData.update({
          _id: $(this).attr('data-id')
        }, {
          $set: {
            sentInvitationDate: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
          }
        });
    });
    Blaze.renderWithData(Template.modal, {
      modalTitle: `Review request sent to ${emails.length} contact(s)`,
      modalToRenderName: 'longText'
    }, document.body);
  },
  'click #sendInvitesCompanies': function(event, templateInstance){
    event.preventDefault();
    const emails = $('.checkbox-companies:checked');
    const emailData = {
      firstName: Meteor.user().profile.firstName,
      lastName: Meteor.user().profile.lastName,
      userId: Meteor.userId(),
    }
    emails.each(function() {
      emailData.email = $(this).val();
        Meteor.call('sendEmail',
                $(this).val(),
                'recruiterq2017@gmail.com',
                `What’s your opinion on ${emailData.firstName} ${emailData.lastName} ?`,
                emailData);
        CSVData.update({
          _id: $(this).attr('data-id')
        }, {
          $set: {
            sentInvitationDate: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
          }
        });
    });
    Blaze.renderWithData(Template.modal, {
      modalTitle: `Review request sent to ${emails.length} contact(s)`,
      modalToRenderName: 'longText'
    }, document.body);
  },
  'click #select-all-companies': function() {
    const status = $('.checkbox-companies').prop('checked');
    if (status) {
      $('.checkbox-companies').prop('checked', false);
    } else {
      $('.checkbox-companies').prop('checked', true);
    }
  },
  'click #select-all-candidates': function() {
    const status = $('.checkbox-candidates').prop('checked');
    if (status) {
      $('.checkbox-candidates').prop('checked', false);
    } else {
      $('.checkbox-candidates').prop('checked', true);
    }
  },
})

Template.invites.helpers({
  tabs: function () {
    return [
      { name: 'Companies', slug: 'companies' },
      { name: 'Candidates', slug: 'candidates' },
      { name: 'Recently Invited', slug: 'recentlyInvited' },

    ];
  },
  activeTab: function () {
    return Session.get('activeTab') || 'unfiltered';
  },
  // csvData: function() {
  //   return CSVData.find()
  // },
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
  templatePaginationRecentlyInvited: function () {
      return Template.instance().paginationRecentlyInvited;
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
  recentlyInvited: function () {
      return Template.instance().paginationRecentlyInvited.getPage();
  },
  selected: function (option) {
      return this.type === option ? 'selected' : '';
    }
})

Template.invites.onCreated(function () {
  const self = this;
  Meteor.autorun(function(){
    const companiesQuery = CSVData.find({
      type: 'company',
      sentInvitationDate: { $exists: true }
    }).fetch();

    const candidatesQuery = CSVData.find({
      type: 'candidate',
      sentInvitationDate: { $exists: true }
    }).fetch();

    companiesQuery.forEach(function(e, i) {
      const oneDay = 24*60*60*1000;
      const sentInvitationDate = e.sentInvitationDate;
      const todayDate = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
      const diffDays = Math.round(Math.abs((new Date(sentInvitationDate).getTime() - new Date(todayDate).getTime())/(oneDay)));
      const self = this;
      CSVData.update({
        _id: e._id
      }, {
        $set: {
          lastSentInvitationDays: diffDays
        }
      });
    });

    candidatesQuery.forEach(function(e, i) {
      const oneDay = 24*60*60*1000;
      const sentInvitationDate = e.sentInvitationDate;
      const todayDate = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
      const diffDays = Math.round(Math.abs((new Date(sentInvitationDate).getTime() - new Date(todayDate).getTime())/(oneDay)));
      const self = this;
      CSVData.update({
        _id: e._id
      }, {
        $set: {
          lastSentInvitationDays: diffDays
        }
      });
    });
  });

    self.contactToEditId = new ReactiveVar(null)
    self.activeTab = new ReactiveVar(null)
    self.csvData = new ReactiveVar(null)
    self.pagination = new Meteor.Pagination(CSVData, {
          filters: {
            type: { $nin: ['company', 'candidate']}
          },
          sort: {
              _id: -1
          },
          perPage: 30
      });
    self.paginationCandidates = new Meteor.Pagination(CSVData, {
          filters: {
            type: 'candidate',
            lastSentInvitationDays: { $gt: 10 }
          },
          sort: {
              _id: -1
          },
          perPage: 30,
      });

        self.paginationCompanies = new Meteor.Pagination(CSVData, {
              filters: {
                type: 'company',
                lastSentInvitationDays: { $gt: 10 }
              },
              sort: {
                  _id: -1
              },
              perPage: 30,
          });

          self.paginationRecentlyInvited = new Meteor.Pagination(CSVData, {
                filters: {
                  lastSentInvitationDays: { $lt: 10 }
                },
                sort: {
                    _id: -1
                },
                perPage: 30,
            });




});
