Template.users.onRendered(function() {
    autosize($('textarea'));
    var showExtraFieldsvar = this.showExtraFields;
    Session.set("currentclassforupdate", this.data);
    $('#editcurrentclass').val(this.data);
        $('#editcurrentclass').trigger("chosen:updated");
    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    $('.modal').appendTo("body");
    if (_.contains(Router.current().url, 'edit')) {
        $('#updateUserForm').modal('show');
    }

    $("button#updateClose").click(function() {
        
        $('#updateUserForm').modal('hide');
        Router.go('users');
    });

    $("button.close").click(function() {
        $('#updateUserForm').modal('hide');
        $('#newUserForm').modal('hide');
        Router.go('users');
    });

    $("button#addClose").click(function() {
        $('#newUserForm').modal('hide');
        Router.go('users');
    });

    $('#all').on('ifChecked', function(event, template) {
        var searchtext = $('#all').val();
        showExtraFieldsvar.set(searchtext);
    });
    $('#student').on('ifChecked', function(event, template) {
        var searchtext = $('#student').val();
        showExtraFieldsvar.set(searchtext);
    });
    $('#teacher').on('ifChecked', function(event, template) {
        var searchtext = $('#teacher').val();
        showExtraFieldsvar.set(searchtext);
    });
    $('#admin').on('ifChecked', function(event, template) {
        var searchtext = $('#admin').val();
        showExtraFieldsvar.set(searchtext);
    });
    setTimeout(function() {
        $(".chosen-select").chosen({
            width: "100%"
        });
    }, 1000);

});
Template.users.onCreated(function() {
    this.showExtraFields = new ReactiveVar("");
    this.usertype = new ReactiveVar("");
});
Template.users.helpers({
    showExtraFields: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().showExtraFields.get();
    },
    usertype: function() {
        // Here we get our template instance from Template.instance() and
        // can access showExtraFields from it.
        return Template.instance().usertype.get();
    },
    isAdmin: function() {
        return Roles.userIsInRole(Meteor.userId(), ['admin']);
    },
    isanAdmin: function(id) {
        return Roles.userIsInRole(id, ['admin']);
    },
    isaTeacher: function(id) {
        return Roles.userIsInRole(id, ['teacher']);
    },
    isaStudent: function(id) {
        return Roles.userIsInRole(id, ['student']);
    },
    studentfield: function(type) {
        return type == "student";
    }

});
Template.users.events({
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
    },
    'click .editstudent': function(event, template) {
        var selecteduserclass=Session.get("currentclassforupdate");
         
        
        $('#editcurrentclass').val(selecteduserclass);
        $('#editcurrentclass').trigger("chosen:updated");
    },
    'change #role': function(event, template) {
        var usertype = $("#role").val();
        template.usertype.set(usertype);
        setTimeout(function() {
            $("#currentclass").chosen({
                width: "100%"
            });
        }, 50);

    },
    'click #adduser': function(event, template) {
        event.preventDefault();
        var userobject = {};
        userobject.username = $("#username").val();
        userobject.password = $("#password").val();
        userobject.email = $("#email").val();
        userobject.role = $("#role").val();
        userobject.firstName = $("#firstName").val();
        userobject.lastName = $("#lastName").val();
        userobject.gender = $("#gender").val();
        userobject.birthday = $("#birthday").val();
        userobject.currentclass = $("#currentclass").val();
        if ($("#currentclass").val() === undefined) {
            userobject.currentclass = "";
        }
        Meteor.call("CreateUser", userobject, function(err, res) {
            if (res) {
                $('#newUserForm').modal('hide');
                Router.go('users');
                     $('#insertUserForm')[0].reset();
            } else {
                
                
            }
        });
    },
    'click #updateuser': function(event, template) {
        event.preventDefault();
        var userobject = {};
        userobject.id = $("#studentid").val();
        userobject.class = $("#editcurrentclass").val();
        Meteor.call("UpdateUser", userobject, function(err, res) {
            if (res) {
                $('#updateUserForm').modal('hide');
                Router.go('users');
            } else {
                
                
            }
        });
    }
});
AutoForm.hooks({
    updateExistingUserForm: {
        onSuccess: function(formType, result) {
            $('#updateUserForm').modal('hide');
            Router.go('users');
            return false;
        }
    },
    insertUserForm: {
        onSuccess: function(formType, result) {
            $('#newUserForm').modal('hide');
        
            Router.go('users');
            return false;
        }
    }
});