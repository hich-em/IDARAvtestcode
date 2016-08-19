
Template.myUploadProgressTemplate5.helpers({
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
Template.myUploadProgressTemplate4.helpers({
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

Template.tps.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");
});
Template.tps.helpers({
    showExtraFields: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().showExtraFields.get();
    },
    isTeacher: function() {
        return Roles.userIsInRole(Meteor.userId(), ['teacher']);
    },
    isStudent: function() {
        return Roles.userIsInRole(Meteor.userId(), ['student']);
    },
    isStudentorTeacher: function() {
        return Roles.userIsInRole(Meteor.userId(), ['student'])||Roles.userIsInRole(Meteor.userId(), ['teacher']);
    }
});

AutoForm.hooks({
    updateExistingNewsForm: {
        onSuccess: function(formType, result) {
            $('#updateNewsForm').modal('hide');
            Router.go('news');
            return false;
        }
    },
    insertTPForm: {
        onSuccess: function(formType, result) {
            $('#newTPForm').modal('hide');
            return false;
        }
    },
    insertQuestinForm: {
        onSuccess: function(formType, result) {
            $('#newQuestionForm').modal('hide');
            return false;
        }
    }
});
