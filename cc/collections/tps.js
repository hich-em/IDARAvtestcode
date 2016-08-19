Tps = new Mongo.Collection('tps');
TpsSchema = new SimpleSchema({
    "name": {
        type: String,
        label: "Nom",
        optional: false
    },
    "deadline": {
        type: Date,
        label: "Date Limite",
        optional: true
    },
    "teacher": {
        type: String,
        optional: true
    },
    "classid": {
        type: String,
        optional: true,
        autoform: {
          type: "hidden",
          label: false
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
    TpsSchema.i18n("schemas.tps");
    Tps.attachSchema(TpsSchema);
});

Tps.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.teacher = user._id;
        doc.created_by = user._id;
        doc.removed = false;
        
        
    }
});

Tps.before.update(function(userId, doc) {
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
    Tps.allow({
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
Tps.deny({
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