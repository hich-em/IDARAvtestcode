Notifications = new Mongo.Collection('notifications');
NotificationsSchema = new SimpleSchema({
    "text": {
        type: String,
        optional: true,
        label: "Text",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    "receiver": {
        type: String,
        optional: true
    },
    "receivertype": {
        type: String,
        optional: true
    },
    "notificationseen": {
        type: [String],
        optional: true
    },
    "created_at": {
        type: Number,
        optional: true

    },
    "created_by": {
        type: String,
        optional: true

    },
    "removed": {
        type: Boolean,
        optional: true

    },
    "removed_by": {
        type: String,
        optional: true

    },
    "removed_at": {
        type: Number,
        optional: true

    },
    "last_modified_by": {
        type: String,
        optional: true

    },
    "last_modified_at": {
        type: Number,
        optional: true

    }
});
Meteor.startup(function() {
    NotificationsSchema.i18n("schemas.notifications");
    Notifications.attachSchema(NotificationsSchema);
});

Notifications.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.created_by = user._id;
        doc.removed = false;
        
        
    }
});

Notifications.before.update(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        
        
        if (doc.removed == true) {
            doc.removed_at = moment().unix();
            doc.removed_by = user._id;

        } else {
            doc.last_modified_at = moment().unix();
            doc.last_modified_by = user._id;
        }
    }
});

if (Meteor.isServer) {
    Notifications.allow({
        insert: function(userId) {
            return !!userId;
        },
        update: function(userId) {
            return !!userId;
        },
        remove: function(userId) {
            return !!userId;
        }
    });


}
Notifications.deny({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId) {
        return true;
    },
    remove: function(userId) {
        return true;
    }
});