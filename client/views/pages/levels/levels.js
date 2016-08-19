Template.levels.rendered = function() {
     $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
  $("button#updatClose").click(function() {
        $('#updateLevelForm').modal('hide');
        
        Router.go('levels');
    });

    $("button.close").click(function() {
        $('#updateLevelForm').modal('hide');
        $('#newLevelForm').modal('hide');
        Router.go('levels');
    });
    $("button#newClose").click(function() {
        $('#newLevelForm').modal('hide');

        Router.go('levels');
    });
};
Template.levels.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");
});
Template.levels.helpers({
    showExtraFields: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().showExtraFields.get();
    }
});
Template.levels.events({
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

Template.level_status.events({
    "click button#status": function(event, template){
        Meteor.call("updateStatusLevel",this.id,this.disable_level_status);
    }
});

AutoForm.hooks({
    updateExistingLevelForm: {
        onSuccess: function(formType, result) {
            $('#updateLevelForm').modal('hide');
            //document.location.reload(true);
            Router.go('levels');
            this.done();

            return false;
        }
    },
    insertLevelForm: {
        onSuccess: function(formType, result) {
            $('#newLevelForm').modal('hide');

            Router.go('levels');
            return false;
        }
    }
});