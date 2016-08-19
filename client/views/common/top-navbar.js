Template.topNavbar.rendered = function() {

    // FIXED TOP NAVBAR OPTION
    // Uncomment this if you want to have fixed top navbar
    // $('body').addClass('fixed-nav');
    // $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');

};

Template.topNavbar.events({

    // Toggle left navigation
    'click #navbar-minimalize': function(event) {

        event.preventDefault();

        // Toggle special class
        $("body").toggleClass("mini-navbar");

        // Enable smoothly hide/show menu
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                function() {
                    $('#side-menu').fadeIn(400);
                }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(
                function() {
                    $('#side-menu').fadeIn(400);
                }, 200);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    },

    // Toggle right sidebar
    'click .right-sidebar-toggle': function() {
        $('#right-sidebar').toggleClass('sidebar-open');
    },
    'click #notificationseen': function(event) {
        var all_notif = Notifications.find({}).fetch();
        all_notif.forEach(function(notif) {
            var notifId = notif._id;
            if (jQuery.inArray(Meteor.userId(), notif.notificationseen) === -1) {
                var notificationseen = [];
                notificationseen.push(Meteor.userId());
                notif.notificationseen = notificationseen;
                var notification =notif;
                delete notification._id;
                Notifications.update(notifId, {$set: notification});
            }
        });

    }
});

Template.topNavbar.helpers({
    numbernotificationNotSeen: function() {
        Meteor.subscribe('allnotifications');
        var all_notif = Notifications.find({}).fetch();
        var nbrnotif = 0;
        all_notif.forEach(function(notif) {
            if (jQuery.inArray(Meteor.userId(), notif.notificationseen) === -1) {

                nbrnotif++;
            }
        });
        return nbrnotif;
        // return ReactiveMethod.call("notificationsnumber","test");
    },
    notifications: function() {
        Meteor.subscribe('allnotifications');
        var dl = 5;
        return Notifications.find({}, {
            sort: {
                created_at: -1
            },
            limit:dl
        });
    },
    pubDate: function(date) {
        return new Date(1000 * date).toLocaleDateString("fr-FR").substring(0, 24) + " " + new Date(1000 * date).toLocaleTimeString("fr-FR").substring(0, 24);
    },
    getExpert: function(text) {
        return text.substring(0, 20);
    },
    isnAdmin: function() {
        return !Roles.userIsInRole(Meteor.userId(), ['admin']);
    },
    isTeacher: function() {
        return Roles.userIsInRole(Meteor.userId(), ['teacher']);
    },
    isStudent: function() {
        
          
        
        return Roles.userIsInRole(Meteor.userId(), ['student']);
    }
});