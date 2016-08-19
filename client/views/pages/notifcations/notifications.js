Template.notifications.rendered = function() {
    //Meteor.call("addseen","test");

    setTimeout(function() {
        var all_notif = Notifications.find({}).fetch();
        var notificationseen = [];
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
    }, 1000);
    autosize($('textarea'));
    // Popover demo
    $("[data-toggle=popover]").popover({
        trigger: "focus"
    });

    // Tooltips demo
    $("[data-toggle=tooltip]").tooltip();
    $("button#addClose").click(function() {
        $('#newNewsForm').modal('hide');
        Router.go('notifications');
    });
};
Template.notifications.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");

});
Template.notifications.helpers({
    showExtraFields: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().showExtraFields.get();
    },
    isAdmin: function() {
        return Roles.userIsInRole(Meteor.userId(), ['admin']);
    }
});
Template.notifications.events({
    'click #searchbtn': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
    },
    'change #searchtext': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
    },
    'keydown #searchtext': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
    },
    'keyup #searchtext': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
    }
});

AutoForm.hooks({
    insertNotificationForm: {
        onSuccess: function(formType, result) {
            $('#newNotificationForm').modal('hide');
            Router.go('notifications');
            return false;
        }
    }
});