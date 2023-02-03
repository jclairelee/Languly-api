//server setup
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const socketServer = require("./socketServer");
const authRoutes = require(`./routes/authRoutes`);
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

const PORT = process.env.PORT || process.env.API_PORT;
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//signup routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);
app.use("/api/users", require("./routes/authRoutes"));
const server = http.createServer(app);

socketServer.getSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("cannnot connect to the database");
    console.error(error);
  });
