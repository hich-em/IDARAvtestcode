Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {
        path: "../../../../../uploads"
    })]
});
if (Meteor.isServer) {
    Images.allow({
        'insert': function(userId, doc) {
            return true;
        },
        'download': function(userId) {
            // add custom authentication code here
            return true;
        },
        'update': function(userId, doc) {
            // add custom authentication code here
            return true;
        }
    });
}