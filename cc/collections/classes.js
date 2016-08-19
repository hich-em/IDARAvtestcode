Classes = new Mongo.Collection('classes');
ClassesSchema = new SimpleSchema({
    "className": {
        type: String,
        label: "Nom",
        optional: false
    },
    "levelId": {
        type: String,
        label: "Niveau",
        optional: true,
        autoform: {
            type: "selectize",
            options: function() {
                var all_levels, levelsArray;

                levelsArray = [];
                all_levels = Levels.find({}).fetch();
                all_levels.forEach(function(level) {
                    levelsArray.push({
                        label: level.levelName,
                        value: level._id
                    });
                });
                return levelsArray;
            }
        }
    },
    "teachers": {
        type: [String],
        label: "Les professeurs",
        optional: true,
        autoform: {
            type: "selectize",
            multiple: true,
            options: function() {
                var all_users, usersArray;

                usersArray = [];
                all_users = Meteor.users.find({}).fetch();
                all_users.forEach(function(thisuser) {
                    if (Roles.userIsInRole(thisuser._id, 'teacher')) {
                        usersArray.push({
                            label: thisuser.username + " " + thisuser.profile.firstName + " " + thisuser.profile.lastName,
                            value: thisuser._id
                        });
                    }
                });
                return usersArray;
            }
        }
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
    ClassesSchema.i18n("schemas.classes");
    Classes.attachSchema(ClassesSchema);
});

Classes.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.created_by = user._id;
        doc.removed = false;

    }
});

Classes.before.update(function(userId, doc) {
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
    Classes.allow({
        insert: function(userId) {
            return !!userId;
        },
        update: function(userId, branch) {
            return !!userId;
        }
    });
}