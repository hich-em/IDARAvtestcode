Template.navigation.rendered = function() {

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

// Used only on OffCanvas layout
Template.navigation.events({

    'click .close-canvas-menu': function() {
        $('body').toggleClass("mini-navbar");
    }

});

Template.navigation.helpers({
    currentUserName: function() {
        var strnames = "";
        var cuser = Meteor.user();
        if (cuser) {
            strnames = cuser.profile.firstName + " " + cuser.profile.lastName;
        }
        return strnames;
    },
    currentUserRole: function() {
        if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
            return "Admin";
        }else if(Roles.userIsInRole(Meteor.userId(), ['teacher'])){
             return "Professeur";
        }else{
             return "Étudiant";
        }
    },
    isAdmin: function() {
        return Roles.userIsInRole(Meteor.userId(), ['admin']);
    },
    isTeacher: function() {
        return Roles.userIsInRole(Meteor.userId(), ['teacher']);
    },
    isStudent: function() {
        
          
        
        return Roles.userIsInRole(Meteor.userId(), ['student']);
    }
});
