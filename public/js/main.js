const chatForm = document.getElementById("chat-form");
const chatMessageDiv = document.getElementById("chat-container");
//Socket Connection
const socket = io();

// Message from server
socket.on("message", (msg) => {
  outputMsg(msg);
  chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
  console.log(msg);
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
  // div.classList.add("class-name")
  div.innerHTML = msg;
  document.getElementById("chat-container").appendChild(div);
};
