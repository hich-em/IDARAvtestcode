Meteor.methods({
    currentUserName: function() {
        var cuserid = this.userId;
        var cuser = Meteor.users.findOne({
            _id: cuserid
        });
        return cuser.profile.firstName + " " + cuser.profile.lastName;
    },
    userFullName: function(id) {
        check(id, String);
        var cuser = Meteor.users.findOne({
            _id: id
        });
        return cuser.profile.firstName + " " + cuser.profile.lastName;
    },
    usersFullName: function(ids) {
        check(ids, [String]);
        var strnames = "";
        ids.forEach(function(id) {
            var cuser = Meteor.users.findOne({
                _id: id
            });
            strnames = strnames + ", " + cuser.profile.firstName + " " + cuser.profile.lastName;

        });
        return strnames.slice(1, strnames.length);
    },
    removeUser: function(id) {
        check(id, String);
        Meteor.users.update(id, {
            $set: {
                removed: true

            }
        });
        return true;
    },
    updateStatusLevel: function(id, level_status) {
        check(id, String);
        check(level_status, Boolean);
        Levels.update(id, {
            $set: {
                hasProject: !level_status

            }
        });
        return true;
    },
    removeLevel: function(id) {
        check(id, String);
        Levels.update(id, {
            $set: {
                removed: true

            }
        });
        return true;
    },
    levelName: function(id) {
        check(id, String);
        return Levels.findOne({
            _id: id
        }).levelName;
    },
    allClasses: function() {
        return Classes.find({});
    },
    removeClass: function(id) {
        check(id, String);
        Classes.update(id, {
            $set: {
                removed: true

            }
        });
        return true;
    },
    removeNews: function(id) {
        check(id, String);
        News.update(id, {
            $set: {
                removed: true

            }
        });
        return true;
    },
    updateStatusTask: function(id, task_status) {
        check(id, String);
        check(task_status, Boolean);
        Tasks.update(id, {
            $set: {
                finished: !task_status
            }
        });
        return true;
    },
    removeProject: function(id) {
        check(id, String);
        Projects.update(id, {
            $set: {
                removed: true

            }
        });
        return true;
    },
    removeTask: function(id) {
        check(id, String);
        Tasks.update(id, {
            $set: {
                removed: true

            }
        });
        return true;
    },
    fileName: function(imageId) {
        check(imageId, String);
        return Images.findOne({
            _id: imageId
        }).original.name;
    },
    notificationsnumber: function(test) {
        check(test, String);
        var all_notif = Notifications.find({}).fetch();
        var nbrnotif = 0;
        
        all_notif.forEach(function(notif) {
            if (jQuery.inArray(this.userId, notif.notificationseen) === -1) {
                nbrnotif++;
            }
        });
        
        return nbrnotif;
    },
    addseen: function(test) {
        check(test, String);
        var all_notif = Notifications.find({}).fetch();
        var notificationseen = [];
        
        all_notif.forEach(function(notif) {
            if (jQuery.inArray(this.userId, notif.notificationseen) === -1) {
                notificationseen.push(this.userId)
                notif.notificationseen = notificationseen;
                Notifications.update(notif._id, notif);
            }
        });
    },
    report: function(id) {
        check(id, String);
        return Rapports.findOne({
            project: id
        });
    },
    reportExiste: function(id) {
        check(id, String);
        var rep = Rapports.findOne({
            project: id
        });
        if (rep != undefined && rep) {
            return true;
        } else {
            return false;
        }
    },
    reportnotExiste: function(id) {
        check(id, String);
        var rep = Rapports.findOne({
            project: id
        });
        if (rep == undefined && !rep) {
            return true;
        } else {
            return false;
        }
    },
    CreateUser: function(formDoc) {
        check(formDoc, {
            username: String,
            password: String,
            email: String,
            firstName: String,
            lastName: String,
            gender: String,
            currentclass: String,
            role: String,
            birthday: String
        });
        formDoc.classlog = [];
        formDoc.classlog.push({
            classid: formDoc.currentclass,
            year: new Date().getFullYear()
        });
        var newuserId = Accounts.createUser({
            username: formDoc.username,
            password: formDoc.password,
            email: formDoc.email,
            profile: {
                "firstName": formDoc.firstName,
                "lastName": formDoc.lastName,
                "gender": formDoc.gender,
                "birthday": formDoc.birthday,
                "currentclass": formDoc.currentclass,
                "classlog": formDoc.classlog
            }
        });
        Roles.addUsersToRoles(newuserId, formDoc.role);
        return true;
    },
    UpdateUser: function(formDoc) {
        check(formDoc, {
            id: String,
            class: String,
        });
        
        var user = Meteor.users.findOne({
            _id: formDoc.id
        });
        
        formDoc.classlog = user.profile.classlog;
        formDoc.classlog.push({
            classid: formDoc.class,
            year: new Date().getFullYear()
        });
        return Meteor.users.update({
            _id: formDoc.id
        }, {
            $set: {
                "profile.currentclass": formDoc.class,
                "profile.classlog": formDoc.classlog
            }
        });
    },
    repnotexist: function(id) {
        check(id, String);
        var rep = Answers.findOne({
            question: id
        });
        if (rep == undefined && !rep) {
            return true;
        } else {
            return false;
        }
    },
    repexist: function(id) {
        check(id, String);
        var rep=Answers.findOne({question:id});
        if(rep!=undefined && rep){
            return true;
        }else{
            return false;
        }
    }
    ,
    answer: function(id) {
        check(id, String);
        return Answers.findOne({question:id});
    }



});