TaskComments = new Mongo.Collection('taskComments');
TaskCommentsSchema = new SimpleSchema({
    "description": {
        type: String,
        optional: false,
        autoform: {
            class: "form-control",
            afFieldInput: {
                type: "textarea",
               

            }
        }
    },
    "taskid": {
        type: String,
        optional: true,
        autoform: {
          type: "hidden",
          label: false
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
    TaskCommentsSchema.i18n("schemas.taskComments");
    TaskComments.attachSchema(TaskCommentsSchema);
});

TaskComments.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.created_by = user._id;
        doc.removed = false;
        
       
    }
});

TaskComments.before.update(function(userId, doc) {
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
    TaskComments.allow({
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