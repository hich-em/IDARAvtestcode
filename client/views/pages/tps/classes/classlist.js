Template.classlist.rendered = function() {
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
Template.classlist.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");
});
Template.classlist.helpers({
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

Template.classlist.events({
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