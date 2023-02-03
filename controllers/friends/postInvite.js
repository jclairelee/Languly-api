const User = require("../../models/users");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../handlers/friends");

const postInvite = async (req, res) => {
  const { targetEmailAddress } = req.body;

  const { userId, email } = req.user;

  // check if friend that we would like to invite is not user

  if (email.toLowerCase() === targetEmailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. you cannot send a friend request to yourself");
  }

  const targetUser = await User.findOne({
    email: targetEmailAddress.toLowerCase(),
  });
  console.log(targetUser);
  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetEmailAddress} has not been found. Please check email address.`
      );
  }

  // create new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // send pending invitations update to specific user
  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent");
};

module.exports = postInvite;
