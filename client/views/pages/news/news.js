Template.news.rendered = function() {
    autosize($('textarea'));
    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");
    if (_.contains(Router.current().url, 'edit')) {
        $('#updateNewsForm').modal('show');
    }

    $("button#updateClose").click(function() {
        $('#updateNewsForm').modal('hide');
        Router.go('news');
    });

    $("button.close").click(function() {
        $('#updateNewsForm').modal('hide');
        $('#newNewsForm').modal('hide');
        Router.go('news');
    });

    $("button#addClose").click(function() {
        $('#newNewsForm').modal('hide');
        Router.go('news');
    });
};
Template.myUploadProgressTemplate.helpers({
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
Template.news.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");
});
Template.news.helpers({
    showExtraFields: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().showExtraFields.get();
    },
    isAdmin: function() {
         return  Roles.userIsInRole(Meteor.userId(), ['admin']);      
    }
});
Template.news.events({
    'click #searchbtn': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
    },
    'change #searchtext': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
    },
    'keydown #searchtext': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
    },
    'keyup #searchtext': function(event, template) {
        var searchtext = $("#searchtext").val();
        template.showExtraFields.set(searchtext);
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
    insertNewsForm: {
        onSuccess: function(formType, result) {
            $('#newNewsForm').modal('hide');
            Router.go('news');
            return false;
        }
    }
});