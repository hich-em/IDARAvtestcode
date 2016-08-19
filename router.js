Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
});
Router.route('/', function() {
    Router.go('dashboard');
});
//
// Dashboards routes
//

Router.route('/dashboard', function() {
    this.render('dashboard');
});

Router.route('/news', {
    name: 'news',
    controller: 'NewsController',
    action: 'view',
    where: 'client',
});
Router.route('/news/:_id/edit', {
    name: 'news.edit',
    controller: 'NewsController',
    action: 'edit',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/news/:_id/delete', {
    name: 'news.delete',
    controller: 'NewsController',
    action: 'delete',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});

Router.route('/news/:_id/article', {
    name: 'news.article',
    controller: 'NewsController',
    action: 'article',
    where: 'client'
});

Router.route('/users', {
    name: 'users',
    controller: 'UsersController',
    action: 'view',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/users/:_id/edit', {
    name: 'users.edit',
    controller: 'UsersController',
    action: 'edit',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/users/:_id/delete', {
    name: 'users.delete',
    controller: 'UsersController',
    action: 'delete',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});

Router.route('/levels', {
    name: 'levels',
    controller: 'LevelsController',
    action: 'view',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/levels/:_id/edit', {
    name: 'levels.edit',
    controller: 'LevelsController',
    action: 'edit',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/levels/:_id/delete', {
    name: 'levels.delete',
    controller: 'LevelsController',
    action: 'delete',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});

Router.route('/classes', {
    name: 'classes',
    controller: 'ClasseslevelController',
    action: 'view',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/classes/:_id/edit', {
    name: 'classes.edit',
    controller: 'ClasseslevelController',
    action: 'edit',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/classes/:_id/delete', {
    name: 'classes.delete',
    controller: 'ClasseslevelController',
    action: 'delete',
    where: 'client',
    onBeforeAction: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});

Router.route('/logout', {
    name: 'user.logout',
    controller: 'UsersController',
    action: 'logout',
    where: 'client'
});
Router.route('/login', {
    name: 'login',
    action: function() {
        this.render('login');
        this.layout('blankLayout');
    },
    where: 'client',
    onBeforeAction: function() {
        if (Meteor.userId()) {
            Router.go('/');
        } else {
            this.next();
        }
    }
});

Router.route('/notifications', {
    name: 'notifications',
    controller: 'NotificationsController',
    action: 'view',
    where: 'client'
});

Router.route('/projects', {
    name: 'projects',
    controller: 'ProjectsController',
    action: 'list',
    where: 'client'
});


Router.route('/projects/:_id/view', {
    name: 'projects.view',
    controller: 'ProjectsController',
    action: 'view',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentProjectid = this.params._id;
        var currentProject = Projects.findOne({
            _id: currentProjectid,
            $or: [{
                supervisor: currentUser
            }, {
                students: currentUser
            }]
        });
        if (!Roles.userIsInRole(currentUser, ['admin'])) {
            if (currentProject && currentProject != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        } else {
            this.next();
        }
    }
});
Router.route('/projects/:_id/edittask', {
    name: 'projects.task',
    controller: 'ProjectsController',
    action: 'task',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentTaskid = this.params._id;
        var currentTask = Tasks.findOne({
            _id: currentTaskid
        });
        var currentProjectid = currentTask.project;
        var currentProject = Projects.findOne({
            _id: currentProjectid,
            $or: [{
                supervisor: currentUser
            }, {
                students: currentUser
            }]
        });

        if (currentProject && currentProject != undefined) {
            this.next();
        } else {
            Router.go('dashboard');
        }


    }
});
Router.route('/projects/:_id/deletetask', {
    name: 'projects.taskdelete',
    controller: 'ProjectsController',
    action: 'taskdelete',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentTaskid = this.params._id;
        var currentTask = Tasks.findOne({
            _id: currentTaskid
        });
        var currentProjectid = currentTask.project;
        var currentProject = Projects.findOne({
            _id: currentProjectid,
            $or: [{
                supervisor: currentUser
            }, {
                students: currentUser
            }]
        });


        if (currentProject && currentProject != undefined) {
            this.next();
        } else {
            Router.go('dashboard');
        }


    }
});
Router.route('/projects/:_id/edit', {
    name: 'projects.edit',
    controller: 'ProjectsController',
    action: 'edit',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentProjectid = this.params._id;
        var currentProject = Projects.findOne({
            _id: currentProjectid,
            supervisor: currentUser
        });
        if (!Roles.userIsInRole(currentUser, ['admin'])) {
            if (currentProject && currentProject != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        } else {
            this.next();
        }
    }
});
Router.route('/projects/:_id/delete', {
    name: 'projects.delete',
    controller: 'ProjectsController',
    action: 'delete',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentProjectid = this.params._id;
        var currentProject = Projects.findOne({
            _id: currentProjectid,
            supervisor: currentUser
        });
        if (!Roles.userIsInRole(currentUser, ['admin'])) {
            if (currentProject && currentProject != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        } else {
            this.next();
        }
    }
});
Router.route('/projects/:_id/student', {
    name: 'projects.student',
    controller: 'ProjectsController',
    action: 'student',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentProjectid = this.params._id;
        var currentProject = Projects.findOne({
            _id: currentProjectid,
            supervisor: currentUser
        });
        if (!Roles.userIsInRole(currentUser, ['admin'])) {
            if (currentProject && currentProject != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        } else {
            this.next();
        }
    }
});
Router.route('/projectsJuries', {
    name: 'projectsjer',
    controller: 'ProjectsController',
    action: 'juries',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/projectsJuries/:_id/details', {
    name: 'projects.details',
    controller: 'ProjectsController',
    action: 'details',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentProjectid = this.params._id;
        var currentProject = Projects.findOne({
            _id: currentProjectid,
            juries: currentUser
        });
        if (currentProject && currentProject != undefined) {
            this.next();
        } else {
            Router.go('dashboard');
        }
    }
});

Router.route('/tps', {
    name: 'tps',
    controller: 'TpsController',
    action: 'view',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});

Router.route('/tps/:_id/list/', {
    name: 'tps.tp',
    controller: 'TpsController',
    action: 'tp',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentclassid = this.params._id;
        var currentclass = Classes.find({
            removed: false,
            teachers: currentUser
        });
        Classes.find({
            removed: false,
            teachers: currentuserid
        });
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            if (currentclass && currentclass != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        }
    }
});

Router.route('/tps/:_id/questions/', {
    name: 'tps.questions',
    controller: 'TpsController',
    action: 'questions',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentTpid = this.params._id;
        var currentTp = Tps.findOne({
            removed: false,
            _id: currentTpid
        });
        var currentclassid = currentTp.classid;
        var currentclass = Classes.find({
            removed: false,
            teachers: currentUser
        });
        Classes.find({
            removed: false,
            teachers: currentuserid
        });
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            if (currentclass && currentclass != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        }
    }
});

Router.route('/tps/:_id/questionstudent/', {
    name: 'tps.studentquestion',
    controller: 'TpsController',
    action: 'studentquestion',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentTpid = this.params._id;
        var currentTp = Tps.findOne({
            removed: false,
            _id: currentTpid
        });
        var currentclassid = currentTp.classid;
        var studentclass = Meteor.users.findOne({
            _id: currentUser,
            removed: false
        }, {
            fields: {
                'emails': 1,
                'username': 1,
                'profile': 1,
                "roles": 1
            }
        }).profile.currentclass;
        if (!Roles.userIsInRole(currentUser, ['student'])) {
            Router.go('dashboard');
        } else {
            if (studentclass && currentclassid && studentclass != undefined && currentclassid != undefined && studentclass === currentclassid) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        }
    }
});

Router.route('/mestps', {
    name: 'tps.studenttp',
    controller: 'TpsController',
    action: 'studenttp',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        if (!Roles.userIsInRole(currentUser, ['student'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/comptesrendus', {
    name: 'crs.viewclass',
    controller: 'TpsController',
    action: 'viewclass',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            this.next();
        }
    }
});
Router.route('/comptesrendus/:_id/tps/', {
    name: 'crs.tpcr',
    controller: 'TpsController',
    action: 'tpcr',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentclassid = this.params._id;
        var currentclass = Classes.find({
            removed: false,
            teachers: currentUser
        });
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            if (currentclass && currentclass != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        }
    }
});
Router.route('/comptesrendus/:_id/students/', {
    name: 'crs.studentcr',
    controller: 'TpsController',
    action: 'studentcr',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentTpid = this.params._id;
        var currentTp = Tps.findOne({
            removed: false,
            _id: currentTpid
        });
        var currentclassid = currentTp.classid;
        var currentclass = Classes.find({
            removed: false,
            teachers: currentUser
        });
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            if (currentclass && currentclass != undefined) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        }
    }
});
Router.route('/comptesrendus/:_id/questions/', {
    name: 'crs.questionscr',
    controller: 'TpsController',
    action: 'questionscr',
    where: 'client',
    onBeforeAction: function(pause) {
        var currentUser = Meteor.userId();
        var currentUserid = this.params._id;
        var studentclass = Meteor.users.findOne({
            _id: currentUserid,
            removed: false
        }, {
            fields: {
                'emails': 1,
                'username': 1,
                'profile': 1,
                "roles": 1
            }
        }).profile.currentclass;
        var currentclassid = currentTp.classid;
        var currentclass = Classes.findOne({
            removed: false,
            teachers: currentUser
        });
        currentclassid = currentclass._id;
        if (!Roles.userIsInRole(currentUser, ['teacher'])) {
            Router.go('dashboard');
        } else {
            if (studentclass && currentclassid && studentclass != undefined && currentclassid != undefined && studentclass === currentclassid) {
                this.next();
            } else {
                Router.go('dashboard');
            }
        }
    }
});
Router.route('/notFound', function() {
    this.render('notFound');
});

Router.onBeforeAction(function() {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
        Router.go('login');
    } else {
        this.next();
    }
}, {
    except: ['login', 'loading']
});