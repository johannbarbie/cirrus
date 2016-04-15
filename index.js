if (Meteor.isClient) {
  Meteor.startup(function () {
    // Code to run on client at startup
  });

  Template.body.helpers({
    // Global helpers (is it really global?)
    GcurrentVote: function () {
      return Session.get("currentVote");
    },

    GcurrentVoteOption: function () {
      return Session.get("currentVoteOption");
    }

  });

  Template.body.events({
    // Global events to track

    "click [data-toggle='myModal']" : function (event) {
      event.preventDefault();

      // Function to trigger modals manually via jQuery. This 
      // allows us to wait on load, and better set and 
      // synchronize the modal and it's content. Automatically
      // triggering the modal from the DOM causes AJAX
      // collisions and errors when combined with dynamically
      // loading modal content through Blaze templates.

      // This function also allows us to parse routing data
      // in the target element through it's URL parameter in
      // either the href or data-template attributes, and set
      // modal content dynamically based on that URL, similarly
      // to what a router would do, but with rendering the
      // content in a modal popup, hopefully with the same
      // or a similar data context.

      var template;
      // Get parameter values from DOM properties
      var modalTarget = event.currentTarget.dataset.target;
      var content = event.currentTarget.dataset.template;

      if (content) {
        // If a template was found, then we use it.
        template = content.split('/')[1];
        // template = content.replace(/^\//,'');
      } else {
        // Otherwise look to the href element propery.
        content = event.currentTarget.getAttribute("href");
        template = content.split('/')[1];
        // template = content.replace(/^\//,'');
      };
      var routeId = content.split('/')[2];

      var modalRoute = {
        _id: routeId,
        template: template
      };

      // We track the template in a session variable to easily
      // access in the modal helper. Esesentially the route is stored here,
      // without having been rendered by a router.
      // TODO: Add full parsing of all route params, data, and other properties
      Session.set("modalRoute", modalRoute);

      $(modalTarget).modal("toggle");

    },

    // Global event for linking and navigating that
    // eliminates the need for wrapper anchor elements.
    "click [data-nav]": function (event) {
      event.preventDefault();
      var tar = event.currentTarget.dataset.nav;
      Router.go(tar);
    },

    // Global event for logging out the current user
    "click [data-action='logoutUser']": function (event) {
      event.preventDefault();
      Meteor.logout();
    }
  });
};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
};
