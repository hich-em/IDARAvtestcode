Template.questionlist.rendered = function() {
    autosize($('textarea'));
    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
   $('.scroll_content').slimscroll({
        height: '200px'
    })
};

Template.questionlist.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");
});
Template.questionlist.helpers({
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