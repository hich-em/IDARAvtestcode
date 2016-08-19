Template.login.rendered = function() {

};

Template.login.events({
    'click #login-form': function(e, tmpl) {
        e.preventDefault();
        
        
        
        Meteor.loginWithPassword(
            tmpl.find("#username").value,
            tmpl.find("#password").value,
            function(error) {
                if (error) {
                    
                    
                } else {
                    Router.go('dashboard');
                }
            }
        );
    }
});