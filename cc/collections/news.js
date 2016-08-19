News = new Mongo.Collection('news');
NewsSchema = new SimpleSchema({
    "newsName": {
        type: String,
        label: "Nom",
        optional: false
    },
    "newsContent": {
        type: String,
        optional: true,
        label: "Contenu",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    "media": {
        type: String,
        optional: true,
        label: "Attachement",
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: 'Choisir un fichier',
                previewTemplate: 'myFilePreview',
                uploadProgressTemplate: 'myUploadProgressTemplate'
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
    NewsSchema.i18n("schemas.news");
    News.attachSchema(NewsSchema);
});

News.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.created_by = user._id;
        doc.removed = false;
        
        
    }
});

News.before.update(function(userId, doc) {
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
    News.allow({
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