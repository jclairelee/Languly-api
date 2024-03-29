const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendInvitationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("FriendInvitation", friendInvitationSchema);
