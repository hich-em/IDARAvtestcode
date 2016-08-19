UsersController = RouteController.extend({
    waitOn: function() {
        this.subscribe('userData');
        this.subscribe('allusersforadmin');
        Meteor.subscribe("roles");

        setTimeout(function() {
            
            
            if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
                Router.go('/');
            }
        }, 1000);
    },
    view: function() {
        this.render('users');
    },
    delete: function() {

     
     
        var _this = this;
        swal({
            title: "Suppression d'un utilisateur",
            text: "êtes-vous sûr",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            closeOnConfirm: false
        }, function(isConfirm) {

            if (isConfirm) {
                Meteor.call("removeUser", _this.params._id, function(err, res) {


                    if (res) {
                        //Meteor.call("updateArticlesByCategoryId",_this.params._id, name_ar);
                        swal("réussite", "Supprimé", "success");


                    } else {
                        sweetAlert("Erreur", "Erreur", 'error');
                    }
                    Router.go('levels');

                });
            } else {
                Router.go('users');
            }



        });


},
edit: function() {
    var id = this.params._id;
    
    var res = Meteor.users.findOne({
        _id: id
    });
    $('#updateUserForm').modal('show');

    this.render('users', {
        data: id
    });
    $('#editcurrentclass').val(res.profile.currentclass);
    $('#editcurrentclass').trigger("chosen:updated");
},
logout: function() {
    Meteor.logout();
}
});

UsersController.helpers({
    users: function(parm) {
        if (parm && parm != "" && parm != "all") {
            if (parm == "student" || parm == "teacher" || parm == "admin") {
                return Meteor.users.find({
                    roles: {
                        $regex: parm,
                        $options: 'i'
                    }

                }, {
                    fields: {
                        created_at: true,
                        profile: true,
                        emails: true,
                        username: true
                    }
                });
            } else {
                return Meteor.users.find({
                    $or: [{
                        "profile.firstName": {
                            $regex: parm,
                            $options: 'i'
                        }
                    }, {
                        "profile.lastName": {
                            $regex: parm,
                            $options: 'i'
                        }
                    }, {
                        username: {
                            $regex: parm,
                            $options: 'i'
                        }
                    }]

                }, {
                    fields: {
                        created_at: true,
                        profile: true,
                        emails: true,
                        username: true
                    }
                });
            }
        } else {
            return Meteor.users.find({}, {
                fields: {
                    created_at: true,
                    profile: true,
                    emails: true,
                    username: true
                }
            });
        }
    },
    classes: function() {
        return ReactiveMethod.call("allClasses");
    }
});