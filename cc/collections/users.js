Schema = {};
Schema.classlog = new SimpleSchema({
    "classid": {
        type: String,
        optional: true
    },
    "year": {
        type: String,
        optional: true
    }
});
Schema.UserProfile = new SimpleSchema({
    "firstName": {
        type: String,
        optional: true
    },
    "lastName": {
        type: String,
        optional: true
    },
    "gender": {
        type: String,
        optional: true
    },
    "birthday": {
        type: String,
        optional: true
    },
    "currentclass": {
        type: String,
        optional: true
    },
    classlog: {
        type: [Schema.classlog],
        optional: true
    },
    disabled: {
        type: Boolean,
        optional: true
    }
});
Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: false
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    profile: {
        type: Schema.UserProfile,
        optional: false
    },
    roles: {
        type: [String],
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
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
    Meteor.users.attachSchema(Schema.User);
});

Meteor.users.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        }, {
            fields: {
                'username': 1
            }
        });
        doc.created_by = user._id;
    }
    doc.created_at = moment().unix();
    doc.removed = false;
});

Meteor.users.before.update(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        }, {
            fields: {
                'username': 1
            }
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
    Meteor.users.allow({
        insert: function(userId, doc) {
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
 Meteor.users.deny({
        insert: function(userId, doc) {
            return !!userId;
        },
        update: function(userId) {
            return !!userId;
        },
        remove: function(userId) {
            return !!userId;

        }
    });
