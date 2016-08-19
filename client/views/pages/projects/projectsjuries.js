Template.projectsJuries.rendered = function() {
  $("#closedetails").click(function() {
        $('#projectdetails').modal('hide');
        Router.go('projectsjer');
    });  
};
