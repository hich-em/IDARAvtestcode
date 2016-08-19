LevelsController = RouteController.extend({
    waitOn: function() {
        Meteor.subscribe('userData');
        this.subscribe('levelsList');
        Meteor.subscribe("roles");
    },
    view: function() {
        this.render('levels');
    },
    delete: function() {

        var _this = this;
        swal({
            title: "Suppression d'un niveau",
            text: "êtes-vous sûr",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            closeOnConfirm: false
        }, function(isConfirm) {

            if (isConfirm) {

                Meteor.call("removeLevel", _this.params._id, function(err, res) {


                    if (res) {
                        //Meteor.call("updateArticlesByCategoryId",_this.params._id, name_ar);
                        swal("réussite", "Supprimé", "success");


                    } else {
                        sweetAlert("Erreur", "Erreur", 'error');
                    }
                    Router.go('levels');

                });

            } else {
                Router.go('levels');
            }



        });
    },
    edit: function() {
        var id = this.params._id;
        $('#updateLevelForm').modal('show');

        this.render('levels', {
            data: function() {
                return Levels.findOne({
                    _id: id
                });
            }
        });
    }

});

LevelsController.helpers({
    levels: function(parm) {
        if (parm && parm != "") {

            return Levels.find({
                "levelName": {
                    $regex: parm,
                    $options: 'i'
                }

            });

        } else {
            return Levels.find({});
        }
    },
    statusText: function(status) {
        if (!status) {
            return "Non";
        } else {
            return "Oui";
        }
    },
    statusClass: function(status) {
        if (!status) {
            return 'btn-warning';
        } else {
            return 'btn-primary';
        }


    }
});