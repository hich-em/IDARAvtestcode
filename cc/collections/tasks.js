Tasks = new Mongo.Collection('tasks');
TasksSchema = new SimpleSchema({
    "name": {
        type: String,
        label: "Nom",
        optional: false
    },
    "description": {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
            class: "form-control",
            afFieldInput: {
                type: "textarea",
               

            }
        }
    },
    "finished": {
        type: Boolean,
        optional: true
    },
    "deadline": {
        type: Date,
        label: "Date Limite",
        optional: true
    },
    "project": {
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
                previewTemplate: 'myFilePreview3',
                uploadProgressTemplate: 'myUploadProgressTemplate3'
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
    TasksSchema.i18n("schemas.tasks");
    Tasks.attachSchema(TasksSchema);
});

Tasks.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.created_by = user._id;
        doc.removed = false;
        doc.finished = false;
        
       
    }
});

Tasks.before.update(function(userId, doc) {
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
    Tasks.allow({
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