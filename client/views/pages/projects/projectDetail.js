Template.projectDetail.onCreated(function() {
    Session.set("taskid", "nothing");
});

Template.projectDetail.rendered = function() {
  
    autosize($('textarea'));
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    $("button#updatClose").click(function() {
        $('#updateProjectForm').modal('hide');
        Router.go('projects');
    });
    $("button#updatClose").click(function() {
        $('#updateProjectForm').modal('hide');
        Router.go('projects');
    });
    $("button.close").click(function() {
        $('#updateProjectForm').modal('hide');
        $('#newProjectForm').modal('hide');
        Router.go('projects');
    });
    $("button#addCommentClose").click(function() {
        $('#taskForm').modal('hide');

        Router.go('projects.view', {
            _id: Session.get("projectid")
        });
    });
    $("button#addClose").click(function() {
        $('#newtaskForm').modal('hide');

        Router.go('projects.view', {
            _id: Session.get("projectid")
        });
    });

};
Template.projectDetail.helpers({

    isAdmin: function() {
        return Roles.userIsInRole(Meteor.userId(), ['admin']);
    },
    isAdminorTeacher: function() {

        return Roles.userIsInRole(Meteor.userId(), ['admin']) || Roles.userIsInRole(Meteor.userId(), ['teacher']);
    },
    isTeacher: function() {
        return Roles.userIsInRole(Meteor.userId(), ['teacher']);
    },
    isStudent: function() {
        return Roles.userIsInRole(Meteor.userId(), ['student']);
    },
    isStudentorTeacher: function() {
        return Roles.userIsInRole(Meteor.userId(), ['student']) || Roles.userIsInRole(Meteor.userId(), ['teacher']);
    }
});
Template.myUploadProgressTemplate6.helpers({
    getAttsAndFileObj: function getAttsAndFileObj(atts, fileObj) {
        if (atts instanceof FS.File) {
            fileObj = atts;
            atts = {};
        } else {
            atts = atts || {};
        }

        var progressFunc;
        if (fileObj instanceof FS.File) {
            progressFunc = function() {
                return fileObj.uploadProgress();
            };
        } else {
            progressFunc = function() {
                return FS.HTTP.uploadQueue.progress();
            };
        }

        // We clone atts so that we can remove bootstrap or semantic props without losing them for
        // later reactive reruns.
        atts = FS.Utility.extend({}, atts);

        var useBootstrap = false,
            useSemantic = false,
            show_percentage = false;
        if (atts.semantic) {
            useSemantic = true;
            if (typeof atts["class"] === "string") {
                atts["class"] += " ui progress";
            } else {
                atts["class"] = "ui progress";
            }
            delete atts.semantic;
        } else if (atts.bootstrap) {
            useBootstrap = true;
            var progress = progressFunc();
            if (typeof atts["class"] === "string") {
                atts["class"] += " progress-bar";
            } else {
                atts["class"] = "progress-bar";
            }
            if (typeof atts.style === "string") {
                atts.style += " width: " + progress + "%;";
            } else {
                atts.style = "width: " + progress + "%;";
            }
            if (atts.showPercent) show_percentage = true;
            atts.role = "progressbar";
            atts["aria-valuenow"] = '' + progress;
            atts["aria-valuemin"] = "0";
            atts["aria-valuemax"] = "100";
            delete atts.bootstrap;
        }

        return {
            progress: progressFunc,
            atts: atts,
            showPercent: show_percentage,
            useBootstrap: useBootstrap,
            useSemantic: useSemantic
        };
    }
});

Template.task_status.events({
    "click button#status": function(event, template) {
        Meteor.call("updateStatusTask", this.id, this.disable_task_status);

    }
});