NewsController = RouteController.extend({
    waitOn: function() {
        this.subscribe('allnews');
        this.subscribe('images');
    },
    view: function() {
        this.render('news');
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
                Meteor.call("removeNews", _this.params._id, function(err, res) {


                    if (res) {
                        //Meteor.call("updateArticlesByCategoryId",_this.params._id, name_ar);
                        swal("réussite", "Supprimé", "success");


                    } else {
                        sweetAlert("Erreur", "Erreur", 'error');
                    }
                    Router.go('levels');

                });
            } else {
                Router.go('news');
            }



        });
    },
    edit: function() {
        var id = this.params._id;
        $('#updateNewsForm').modal('show');

        this.render('news', {
            data: function() {
                return News.findOne({
                    _id: id
                });
            }
        });
    },
    article: function() {
        var id = this.params._id;
        this.render('article', {
            data: function() {
                return News.findOne({
                    _id: id
                });
            }
        });
    }

});

NewsController.helpers({
    news: function(parm) {
        if (parm && parm != "") {
            return News.find({
                newsName: {
                    $regex: parm,
                    $options: 'i'
                }

            }, {
                sort: {
                    created_at: 1
                }
            });
        } else {
            return News.find({}, {
                sort: {
                    created_at: 1
                }
            });
        }
    },
    pubDate: function(date) {
          return new Date(1000*date).toLocaleDateString("fr-FR").substring(0, 24)+" "+new Date(1000*date).toLocaleTimeString("fr-FR").substring(0, 24);      
    },
    fileName: function(id) {
         return ReactiveMethod.call("fileName",id);     
    }
});