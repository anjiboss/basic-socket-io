const express = require("express");
const app = express();

const path = require("path");

const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server);

// Utils
const formatMsg = require("./utils/message");

const chatBot = "Chat Bot";
app.use(express.static(path.join(__dirname, "public")));

// Run when Client Connected
io.on("connection", (socket) => {
  // Send ONLY to the connected user
  socket.emit("message", formatMsg(chatBot, "welcome to Chat"));

  // Send to OTHER connected user
  socket.broadcast.emit(
    "message",
    formatMsg(chatBot, "A user has joined the chat")
  );

  //Runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("message", formatMsg(chatBot, "A user has disconnected"));
  });

  //Catch the message
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMsg("User", msg));
  });

  // Send to ALL the Client
  // io.emit()
});

const PORT = process.env.PORT || 3000;
server.listen(3000, () => console.log(`running on ${PORT}`));
