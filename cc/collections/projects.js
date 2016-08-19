Projects = new Mongo.Collection('projects');
ProjectsSchema = new SimpleSchema({
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
                type: "textarea"

            }
        }
    },
    "status": {
        type: Number,
        optional: true,
        defaultValue: 0,
        max: 100,
        min: 0
    },
    "supervisor": {
        type: String,
        label: "Encadrant",
        optional: true,
        autoform: {
            type: "selectize",
            options: function() {
                var all_users, usersArray;

                usersArray = [];
                
                all_users = Meteor.users.find({
                    roles: 'teacher'
                }).fetch();
                
                all_users.forEach(function(thisuser) {
                    usersArray.push({
                        label: thisuser.username + " " + thisuser.profile.firstName + " " + thisuser.profile.lastName,
                        value: thisuser._id
                    });
                });
                
                return usersArray;
            }
        }
    },
    "students": {
        type: [String],
        optional: true,
        label: "Étudiants",
        autoform: {
            type: "selectize",
            multiple: true,
            maxItems: 2,
            options: function() {
                var all_users, usersArray;
                
                usersArray = [];
                all_users = Meteor.users.find({
                    roles: 'student'
                }).fetch();
                
                all_users.forEach(function(thisuser) {
                    usersArray.push({
                        label: thisuser.username + " " + thisuser.profile.firstName + " " + thisuser.profile.lastName,
                        value: thisuser._id
                    });
                });
                
                return usersArray;
            }
        }
    },
    "juries": {
        type: [String],
        optional: true,
        label: "Jurys",
        autoform: {
            type: "selectize",
            multiple: true,
             maxItems: 2,
            options: function() {
                var all_users, usersArray;
                
                usersArray = [];
                all_users = Meteor.users.find({
                    roles: 'teacher'
                }).fetch();
                
                all_users.forEach(function(thisuser) {
                    usersArray.push({
                        label: thisuser.username + " " + thisuser.profile.firstName + " " + thisuser.profile.lastName,
                        value: thisuser._id
                    });
                });
                
                return usersArray;
            }
        }
    },
    "soutenance": {
        type: Date,
        label: "Date de Soutenance",
        optional: true
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
                previewTemplate: 'myFilePreview2',
                uploadProgressTemplate: 'myUploadProgressTemplate2'
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
    ProjectsSchema.i18n("schemas.projects");
    Projects.attachSchema(ProjectsSchema);
});

Projects.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        if (!doc.supervisor || doc.supervisor == "" || doc.supervisor == undefined) {
            doc.supervisor = userId;
        }
        doc.created_at = moment().unix();
        doc.created_by = user._id;
        doc.removed = false;
        doc.last_modified_at = moment().unix();
        doc.last_modified_by = user._id;
    }
});

Projects.before.update(function(userId, doc) {
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
    Projects.allow({
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
