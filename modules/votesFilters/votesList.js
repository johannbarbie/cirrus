import { ReactiveDict } from 'meteor/reactive-dict'; // for reactive result filtering

if (Meteor.isClient) {
  Template.votesList.onCreated(function () {
    var self = this;

    self.autorun(function () {
      self.subscribe("votesList");
    });

    this.titles = new ReactiveDict(); // for reactive result title filtering

  });

  Template.votesList.helpers({

    votesList: function () {
      // Here we will develop filters for searching and displaying different
      // groups of votes.
      const instance = Template.instance();
      
      const baseQuery = {
        $or: [
            {voteStatus: "published"},
            {voteStatus: "closed"}
          ]
        };
    
      const sort = {sort: {publishedOn: -1, createdOn: -1}};

      //return all of the tasks
      let query = baseQuery;

      let inputChanged = instance.titles.get('inputChanged');
      // if input, filter votes
      if (inputChanged && inputChanged.length > 0) {
        query = {
          $and: [baseQuery
          , {
            title: new RegExp(inputChanged)
          }]
        };
      }

      return votesCollection.find(query, sort).fetch();
    } 

  });

  Template.votesList.events({
    'input .input-changed input'(event, instance) { //event: input, class: input-changed, tag: input
      instance.titles.set('inputChanged', event.target.value);
    }
  });



};
