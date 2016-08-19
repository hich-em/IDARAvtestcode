Template.classes.rendered = function() {
     $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
  $("button#updatClose").click(function() {
        $('#updateClassForm').modal('hide');
        Router.go('classes');
    });

    $("button.close").click(function() {
        $('#updateClassForm').modal('hide');
        $('#newClassForm').modal('hide');
        Router.go('classes');
    });
    $("button#newClose").click(function() {
        $('#newClassForm').modal('hide');

        Router.go('classes');
    });
};
Template.classes.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");
});
Template.classes.helpers({
    showExtraFields: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().showExtraFields.get();
    }
});
Template.classes.events({
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
    updateExistingClassForm: {
        onSuccess: function(formType, result) {
            $('#updateClassForm').modal('hide');
            //document.location.reload(true);
            Router.go('classes');
            this.done();

            return false;
        }
    },
    insertClassForm: {
        onSuccess: function(formType, result) {
            $('#newClassForm').modal('hide');

            Router.go('classes');
            return false;
        }
    }
});