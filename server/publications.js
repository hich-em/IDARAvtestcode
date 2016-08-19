Meteor.publish("userData", function() {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            'emails': 1,
            'username': 1,
            'profile': 1,
            "roles": 1
        }
    });
});

Meteor.publish("allusersforadmin", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'admin')) {
        return Meteor.users.find({
            removed: false
        }, {
            fields: {
                'emails': 1,
                'username': 1,
                'profile': 1,
                "roles": 1
            }
        });
    } else {
        return false;
    }
});

Meteor.publish("studentList", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'admin') || Roles.userIsInRole(currentuserid, 'teacher')) {
        return Meteor.users.find({
            removed: false,
            roles: "student"
        }, {
            fields: {
                'emails': 1,
                'username': 1,
                'profile': 1,
                "roles": 1
            }
        });
    } else {
        return false;
    }
});
Meteor.publish("teachersList", function() {
    return Meteor.users.find({
        removed: false,
        roles: "teacher"
    }, {
        fields: {
            'emails': 1,
            'username': 1,
            'profile': 1,
            "roles": 1
        }
    });

});

Meteor.publish("allnews", function() {
    return News.find({
        removed: false
    });

});
Meteor.publish("allprojects", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'admin')) {
        return Projects.find({
            removed: false
        });
    } else {
        return Projects.find({
            removed: false,
            $or: [{
                supervisor: currentuserid
            }, {
                students: currentuserid
            }]

        });
    }

});
Meteor.publish("juriesPro", function() {
    var currentuserid = this.userId;
    return Projects.find({
        juries: currentuserid,
        removed: false
    });


});

Meteor.publish("reportproj", function(id) {
    check(id, String);
    var currentuserid = this.userId;
    return Rapports.find({
        project: id,
        removed: false
    });

});

Meteor.publish("allreportproj", function() {
    var currentuserid = this.userId;
    return Rapports.find({});

});





Meteor.publish("studentListpro", function(ids) {
    check(ids, [String]);
    return Meteor.users.find({
        removed: false,
        _id: {
            $in: ids
        }
    }, {
        fields: {
            'emails': 1,
            'username': 1,
            'profile': 1,
            "roles": 1
        }
    });
});

Meteor.publish("juryListpro", function(ids) {
    check(ids, [String]);
    return Meteor.users.find({
        removed: false,
        _id: {
            $in: ids
        }
    }, {
        fields: {
            'emails': 1,
            'username': 1,
            'profile': 1,
            "roles": 1
        }
    });
});

Meteor.publish("supervisorOfProject", function(id) {
    check(id, String);
    return Meteor.users.find({
        _id: id
    }, {
        fields: {
            'emails': 1,
            'username': 1,
            'profile': 1,
            "roles": 1
        }
    });
});

Meteor.publish('images', function() {
    return Images.find();
});

Meteor.publish("allnotifications", function() {
    return Notifications.find({
        removed: false
    });

});
Meteor.publish("levelsList", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'admin')) {
        return Levels.find({
            removed: false
        });
    } else {
        return false;
    }

});

Meteor.publish("classesList", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'admin')) {
        return Classes.find({
            removed: false
        });
    } else {
        return false;
    }

});
Meteor.publish("tasksList", function(id) {
    check(id, String);
    return Tasks.find({
        removed: false,
        project: id
    });
});

Meteor.publish("messagesList", function(id) {
    check(id, String);
    return Messages.find({
        project: id
    });
});

Meteor.publish("taskCommentList", function(id) {
    check(id, String);
    return TaskComments.find({
        taskid: id
    });
});

Meteor.publish("roles", function() {
    return Meteor.roles.find({});
});
Meteor.publish("levelsListTeacher", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'teacher')) {
        return Levels.find({
            removed: false
        });
    } else {
        return false;
    }

});
Meteor.publish("classesListTeacher", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'teacher')) {

        return Classes.find({
            removed: false,
            teachers: currentuserid
        });
    } else {
        return false;
    }

});

Meteor.publish("tpListTeacher", function(id) {
    check(id, String);
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'teacher')) {
        return Tps.find({
            removed: false,
            teacher: currentuserid,
            classid: id
        });
    } else {
        return false;
    }
});
Meteor.publish("tpListTeacherid", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'teacher')) {
        return Tps.find({
            removed: false,
            teacher: currentuserid
        });
    } else {
        return false;
    }
});

Meteor.publish("questionsListTeacher", function(id) {
    check(id, String);
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'teacher')) {
        return Questions.find({
            removed: false,
            tp: id
        });
    } else {
        return false;
    }
});

Meteor.publish("answerListcr", function(id) {
    check(id, String);
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'teacher')) {
        return Answers.find({
            removed: false,
            student: id
        });
    } else {
        return false;
    }
});

Meteor.publish("tpListStudent", function() {
    var currentuserid = this.userId;
    var studentclass;
    if (Roles.userIsInRole(currentuserid, 'student')) {
        studentclass = Meteor.users.findOne({
            _id: currentuserid,
            removed: false
        }, {
            fields: {
                'emails': 1,
                'username': 1,
                'profile': 1,
                "roles": 1
            }
        }).profile.currentclass;
        return Tps.find({
            removed: false,
            classid: studentclass
        });
    } else {
        return false;
    }
});

Meteor.publish("questionsListStudent", function(id) {
    check(id, String);
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'student')) {
        return Questions.find({
            removed: false,
            tp: id
        });
    } else {
        return false;
    }
});


Meteor.publish("studentanswers", function() {
    var currentuserid = this.userId;
    if (Roles.userIsInRole(currentuserid, 'student')) {
        return Answers.find({
            removed: false,
            student: currentuserid
        });
    } else {
        return false;
    }
});