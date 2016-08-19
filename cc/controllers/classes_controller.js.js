ClasseslevelController = RouteController.extend({
    waitOn: function() {
        Meteor.subscribe('userData');
        Meteor.subscribe("roles");
        this.subscribe('classesList');
    },
    view: function() {
        this.render('classes');
    },
    delete: function() {

        var _this = this;
        swal({
            title: "Suppression d'un classe",
            text: "êtes-vous sûr",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            closeOnConfirm: false
        }, function(isConfirm) {

            if (isConfirm) {
                Meteor.call("removeClass", _this.params._id, function(err, res) {


                    if (res) {
                        //Meteor.call("updateArticlesByCategoryId",_this.params._id, name_ar);
                        swal("réussite", "Supprimé", "success");


                    } else {
                        sweetAlert("Erreur", "Erreur", 'error');
                    }
                    Router.go('classes');

                });
            } else {
                Router.go('classes');
            }



        });
    },
    edit: function() {
        var id = this.params._id;
        $('#updateClassForm').modal('show');

        this.render('classes', {
            data: function() {
                return Classes.findOne({
                    _id: id
                });
            }
        });
    }

});

ClasseslevelController.helpers({
    classes: function(parm) {
        if (parm && parm != "") {

            return Classes.find({
                "className": {
                    $regex: parm,
                    $options: 'i'
                }

            });

        } else {
            return Classes.find({});
        }
    },
    levelName: function(id) {
        return ReactiveMethod.call("levelName", id);
    },
    teachersName: function(ids) {
        return ReactiveMethod.call("usersFullName", ids);
    }
});