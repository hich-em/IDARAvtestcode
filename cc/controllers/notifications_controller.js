NotificationsController = RouteController.extend({
    waitOn: function() {
        this.subscribe('allnotifications');

    },
    view: function() {
        this.render('notifications');
    }
});

NotificationsController.helpers({
    notifications: function(parm) {
        if (parm && parm != "") {
            return Notifications.find({
                text: {
                    $regex: parm,
                    $options: 'i'
                }

            }, {
                sort: {
                    created_at: -1
                }
            });
        } else {
            return Notifications.find({}, {
                sort: {
                    created_at: -1
                }
            });
        }
    }
});