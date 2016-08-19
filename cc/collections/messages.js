Messages = new Mongo.Collection('messages');
MessagesSchema = new SimpleSchema({
    "content": {
        type: String,
        optional: false,
        label: "Message",
        autoform: {
            class: "form-control",
            afFieldInput: {
                type: "textarea",
               

            }
        }
    },
    "project": {
        type: String,
        optional: true,
        autoform: {
          type: "hidden",
          label: false
        }
    },
    "sender": {
        type: String,
        optional: true
    },
    "created_at": {
        type: Number,
        optional: true

    },
    "created_by": {
        type: String,
        optional: true

    }
});
Meteor.startup(function() {
    MessagesSchema.i18n("schemas.messages");
    Messages.attachSchema(MessagesSchema);
});

Messages.before.insert(function(userId, doc) {
    if (userId) {
        var user = Meteor.users.findOne({
            _id: userId
        });
        doc.created_at = moment().unix();
        doc.sender = userId;
        doc.created_by = user._id;
        doc.removed = false;
        
        
    }
});


if (Meteor.isServer) {
    Messages.allow({
        insert: function(userId) {
            return !!userId;
        }
    });


}