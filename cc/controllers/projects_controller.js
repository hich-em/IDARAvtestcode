ProjectsController = RouteController.extend({
    waitOn: function() {
        Meteor.subscribe('userData');
        this.subscribe('studentList');
        Meteor.subscribe("roles");
        Meteor.subscribe('allusersforadmin');
        this.subscribe('teachersList');
    },
    list: function() {
        this.subscribe('allprojects');
        this.render('projects');
    },
    delete: function() {

        this.subscribe('allprojects');
        var _this = this;
        swal({
            title: "Suppression d'un projet",
            text: "êtes-vous sûr",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            closeOnConfirm: false
        }, function(isConfirm) {

            if (isConfirm) {
                Meteor.call("removeProject", _this.params._id, function(err, res) {


                    if (res) {
                        swal("réussite", "Supprimé", "success");


                    } else {
                        sweetAlert("Erreur", "Erreur", 'error');
                    }
                    Router.go('levels');

                });
            } else {
                Router.go('projects');
            }



        });
    },
    edit: function() {

        this.subscribe('allprojects');
        var id = this.params._id;

        $('#updateProjectForm').modal('show');

        this.render('projects', {
            data: function() {
                return Projects.findOne({
                    _id: id
                });
            }
        });
    },
    student: function() {

        this.subscribe('allprojects');
        var id = this.params._id;

        $('#updateProjectForm').modal('show');

        this.render('projects', {
            data: function() {
                return Projects.findOne({
                    _id: id
                });
            }
        });
    },
    view: function() {
        this.subscribe('allprojects');
        var id = this.params._id;
        Session.set("projectid", id);
        if (id !== undefined && id != "") {
            var project = Projects.findOne({
                _id: id
            });
            Meteor.subscribe('studentListpro', project.students);
            Meteor.subscribe('supervisorOfProject', project.supervisor);
            Meteor.subscribe('juryListpro', project.juries);
            Meteor.subscribe('reportproj', project._id);
            Meteor.subscribe('tasksList', project._id);
            Meteor.subscribe('messagesList', project._id);
        }

        this.render('projectDetail', {
            data: function() {
                return Projects.findOne({
                    _id: id
                });
            }
        });
    },
    task: function() {
        this.subscribe('allprojects');
        $('#taskForm').modal('show');
        var id = Session.get("projectid");
        var id2 = this.params._id;
        var prj = Projects.findOne({
            _id: id
        });
        Session.set("taskid", id2);
        if (id != undefined && id != "") {
            var project = Projects.findOne({
                _id: id
            });
            Meteor.subscribe('studentListpro', project.students);
            Meteor.subscribe('supervisorOfProject', project.supervisor);
            Meteor.subscribe('tasksList', project._id);
            Meteor.subscribe('messagesList', project._id);
        }
        if (id2 != undefined && id2 != "") {
            var task = Tasks.findOne({
                _id: id2
            });
            Meteor.subscribe('taskCommentList', id2);
        }
        this.render('projectDetail', {
            data: function() {
                return Projects.findOne({
                    _id: id
                });
            }
        });
    },
    taskdelete: function() {
        this.subscribe('allprojects');
        var id = Session.get("projectid");
        var _this = this;
        swal({
            title: "Suppression d'une tache",
            text: "êtes-vous sûr",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            closeOnConfirm: false
        }, function(isConfirm) {

            if (isConfirm) {
                Meteor.call("removeTask", _this.params._id, function(err, res) {
                    if (res) {
                        swal("réussite", "Supprimé", "success");

                    } else {
                        sweetAlert("Erreur", "Erreur", 'error');
                    }
                    Router.go('levels');
                });
            } else {
                Router.go('projects.view', {
                    _id: Session.get("projectid")
                });
            }
        });
    },
    juries: function() {
        this.subscribe('juriesPro');
        Meteor.subscribe('allreportproj');
        this.render('projectsJuries');
    },
    details: function() {
        $('#projectdetails').modal('show');
        this.subscribe('juriesPro');
        var id = this.params._id;
        this.render('projectsJuries', {
            data: function() {
                return Projects.findOne({
                    _id: id
                });
            }
        });
    }
});

ProjectsController.helpers({
    projects: function(parm) {
        if (parm && parm != "") {
            return Projects.find({
                $or: [{
                    name: {
                        $regex: parm,
                        $options: 'i'
                    }
                }, {
                    description: {
                        $regex: parm,
                        $options: 'i'
                    }
                }, {
                    status: {
                        $regex: parm,
                        $options: 'i'
                    }
                }]

            });

        } else {
            return Projects.find({});
        }
    },
    tasks: function() {
         return Tasks.find();
    },
    thisTask: function(id) {
        return Tasks.findOne({
            _id: id
        });
    },
    taskcomments: function() {
        return TaskComments.find({});
    },
    messages: function() {
        return Messages.find({});
    },
    pubDate: function(date) {
        if (date) {
            return new Date(1000 * date).toLocaleDateString("fr-FR").substring(0, 24) + " " + new Date(1000 * date).toLocaleTimeString("fr-FR").substring(0, 24);
        } else {
            return "";
        }
    },
    pubDatefr: function(date) {
        if (date) {
            return new Date(date).toLocaleDateString("fr-FR").substring(0, 24);
        } else {
            return "";
        }
    },
    fileName: function(id) {
        return ReactiveMethod.call("fileName", id);
    },
    soutenanceExiste: function(id) {
        return id != undefined && id != "";
    },
    soutenancenotExiste: function(id) {
        return id == undefined || id == "";
    },
    fileExiste: function(id) {

        return id != undefined && id != "";
    },
    juriesNotExiste: function(juries) {
        return juries == undefined;
    },
    noStudent: function(students) {
        return students == undefined;
    },
    juriesExiste: function(juries) {
        return juries != undefined;
    },
    teacherName: function(id) {
        return ReactiveMethod.call("userFullName", id);
    },
    userName: function(id) {
        return ReactiveMethod.call("userFullName", id);
    },
    studentsName: function(ids) {
        return ReactiveMethod.call("usersFullName", ids);
    },
    textStatus: function(status) {
        if (status < 100) {
            return "Encours";
        } else {
            return "Terminer";
        }
    },
    colorStatus: function(status) {
        if (status < 100) {
            return 'label-warning';
        } else {
            return 'label-primary';
        }
    },
    statusText: function(status) {
        if (!status) {
            return "Encours";
        } else {
            return "Terminer";
        }
    },
    statusClass: function(status) {
        if (!status) {
            return 'btn-warning';
        } else {
            return 'btn-primary';
        }
    },
    statusClasslable: function(status) {
        if (!status) {
            return 'label-warning';
        } else {
            return 'label-primary';
        }
    },
    taskId: function(status) {
        return Session.get("taskid");
    },
    reportnotExiste: function(id) {
        return ReactiveMethod.call("reportnotExiste", id);
    },
    reportExiste: function(id) {
        return ReactiveMethod.call("reportExiste", id);
    },
    report: function(id) {
        return ReactiveMethod.call("report", id);
    }
});