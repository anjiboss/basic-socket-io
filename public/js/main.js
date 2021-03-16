const chatForm = document.getElementById("chat-form");
const chatMessageDiv = document.getElementById("chat-container");
//Socket Connection
const socket = io();

//Get Username and Room from URL
//Using QS
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("joinRoom", { username, room });

//Get Current Online User

socket.on("onlineUsers", (users) => {
  console.log(users);
});

// Message from server
socket.on("message", (msg) => {
  outputMsg(msg);
  chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
});

//Message Submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

const outputMsg = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message-container");
  div.innerHTML = `<p class="username">${msg.userName}</p><p class="msg-time">${msg.time}</p><p class="message">${msg.msg}</p>`;
  document.getElementById("chat-container").appendChild(div);
};
