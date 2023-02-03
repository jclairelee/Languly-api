const friendsUpdates = require("../../handlers/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // update pending invitations
    friendsUpdates.updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation succesfully rejected");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong please try again");
  }
};

module.exports = postReject;
