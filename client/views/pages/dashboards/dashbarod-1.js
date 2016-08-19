Template.dashboard.helpers({
    currentUserName: function() {
        return ReactiveMethod.call("currentUserName");   
    }
});