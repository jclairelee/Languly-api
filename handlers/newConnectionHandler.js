const serverStore = require("../serverStore");

const newConnectionHandler = async (socket, io) => {
  const userInfo = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userInfo.userId,
  });
};

module.exports = newConnectionHandler;
