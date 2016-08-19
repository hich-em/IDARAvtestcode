Levels = new Mongo.Collection('levels');
LevelsSchema = new SimpleSchema({
    "levelName": {
        type: String,
        label: "Nom",
        optional: false
    },
    "hasProject": {
        type: Boolean,
        label: "PFE / PFA",
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
    LevelsSchema.i18n("schemas.levels");
    Levels.attachSchema(LevelsSchema);
});

Levels.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.created_by = user._id;
        doc.removed = false;
    }
});

Levels.before.update(function(userId, doc) {
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
    Levels.allow({
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