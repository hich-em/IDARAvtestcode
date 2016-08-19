TpsController = RouteController.extend({
    waitOn: function() {
        this.subscribe("roles");
        this.subscribe('userData');

    },
    view: function() {
    
        this.subscribe('classesListTeacher');
        this.subscribe('levelsListTeacher');
        this.render('classlist');
    },
    delete: function() {

        var _this = this;
        swal({
            title: "Suppression d'un tp",
            text: "êtes-vous sûr",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            closeOnConfirm: false
        }, function(isConfirm) {

            if (isConfirm) {
                Tps.update(_this.params._id, {
                    $set: {
                        removed: true
                    }
                }, function(err) {
                    if (!err) {
                        swal("réussite", "Supprimé", "success");


                    } else {
                        sweetAlert("Erreur", "Erreur", 'error');
                    }
                    Router.go('tps');
                })
            } else {
                Router.go('tps');
            }



        });
    },
    tp: function() {
        var id = this.params._id;
     
        this.subscribe('classesListTeacher');
        Meteor.subscribe('tpListTeacher', id);

        this.render('tps', {
            data: function() {
                return Classes.findOne({
                    _id: id
                });
            }
        });
    },
    viewclass: function() {
    
        this.subscribe('classesListTeacher');
        this.subscribe('levelsListTeacher');
        this.render('classcr');
    },
    tpcr: function() {
        var id = this.params._id;
      Session.set("classidsession",id);
        this.subscribe('classesListTeacher');
        Meteor.subscribe('tpListTeacher', id);

        this.render('tpscr', {
            data: function() {
                return Classes.findOne({
                    _id: id
                });
            }
        });
    },
    studentcr: function() {
   
        var id = this.params._id;
        Session.set("tpidsession",id);
        Meteor.subscribe('studentList');
        this.render('studentcr');
    },
    questionscr: function() {
   
        var id = this.params._id;
        Session.set("studentidsession",id);
        id2 = Session.get("tpidsession");
         Meteor.subscribe('questionsListTeacher', id2);
        Meteor.subscribe('tpListTeacherid');
        Meteor.subscribe('answerListcr', id);
        this.render('questionlistcr');
    },
    questions: function() {
   
        var id = this.params._id;
        Meteor.subscribe('tpListTeacherid');
        Meteor.subscribe('questionsListTeacher', id);
        this.render('questionlist', {
            data: function() {
                return Tps.findOne({
                    _id: id
                });
            }
        });
    },
    studentquestion: function() {
        var id = this.params._id;
        Meteor.subscribe('tpListStudent');
        Meteor.subscribe('questionsListStudent', id);
         Meteor.subscribe('studentanswers');
        this.render('questionliststuednt', {
            data: function() {
                return Tps.findOne({
                    _id: id
                });
            }
        });
    },
    studenttp: function() {

        Meteor.subscribe('tpListStudent');
        this.render('tpsstudentlist');
    }

});

TpsController.helpers({
    tps: function(parm) {
        if (parm && parm != "") {
            return Tps.find({
                name: {
                    $regex: parm,
                    $options: 'i'
                }

            }, {
                sort: {
                    created_at: 1
                }
            });
        } else {
            return Tps.find({}, {
                sort: {
                    created_at: 1
                }
            });
        }
    },
    tpstudent: function() {
        return Tps.find({}, {
                sort: {
                    created_at: -1
                }
            });
    },
    classes: function(parm) {
        if (parm && parm != "") {
            return Classes.find({
                className: {
                    $regex: parm,
                    $options: 'i'
                }

            }, {
                sort: {
                    created_at: 1
                }
            });
        } else {
            return Classes.find({}, {
                sort: {
                    created_at: 1
                }
            });
        }
    },
    questions: function(parm) {
        if (parm && parm != "") {
            return Questions.find({
                text: {
                    $regex: parm,
                    $options: 'i'
                }

            }, {
                sort: {
                    created_at: 1
                }
            });
        } else {
            return Questions.find({}, {
                sort: {
                    created_at: 1
                }
            });
        }
    },
    students: function(parm) {
        if (parm && parm != "" && parm != "all") {
         
                return Meteor.users.find({
                    "profile.currentclass":Session.get("classidsession"),
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
        
        } else {
            return Meteor.users.find({"profile.currentclass":Session.get("classidsession")}, {
                fields: {
                    created_at: true,
                    profile: true,
                    emails: true,
                    username: true
                }
            });
        }
    },
    levelName: function(id) {
       return ReactiveMethod.call("levelName", id);
    },
    pubDate: function(date) {
        if (date) {
            return new Date(date).toLocaleDateString("fr-FR").substring(0, 24);
        } else {
            return "";
        }
    },
    fileExiste: function(id) {
        return id != undefined && id != "";
    },
    fileName: function(id) {
        return ReactiveMethod.call("fileName", id);
    },
    repnotexist: function(id) {
        return ReactiveMethod.call("repnotexist", id);    
    },
    repexist: function(id) {
        return ReactiveMethod.call("repexist", id);
    },
    answer: function(id) {
       return ReactiveMethod.call("answer", id);
    },
    userName: function(id) {
        return ReactiveMethod.call("userFullName", id);
    }
});