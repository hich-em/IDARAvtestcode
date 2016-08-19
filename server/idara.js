Meteor.startup(function() {
    if (Meteor.users.find().count() == 0) {
        var userid = Accounts.createUser({
            username: 'adminidara',
            email: 'hichemchouaibi2@gmail.com',
            password: 'idara#Admin2015@Q4',
            profile: {
                "firstName": "Hichem",
                "lastName": "Chouaibi",
                "gender": "male",
                "birthday": new Date('1992-09-17')
            }
        });
        Roles.addUsersToRoles(userid,['admin']);
    }
});