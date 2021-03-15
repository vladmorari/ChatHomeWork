const divLogIn = document.querySelector(".chatName");
const chat = document.querySelector(".chat");
const listMessages = document.querySelector(".listMessages");
const buttonLog = document.querySelector("#setNameButton");
const inputNme = document.querySelector("#inputName");
const userName = document.querySelector("#userName");
const inputMessage = document.querySelector("#inputMessage");
const buttonSendMsg = document.querySelector("#buttonSendMsg");
let messageList = [];
buttonLog.addEventListener("click", switchPage);
buttonSendMsg.addEventListener("click", addMessage);
let name;
function switchPage() {
  name = inputNme.value.length < 1 ? "Not Name" : inputNme.value;
  userName.innerHTML += name;
  divLogIn.style.display = "none";
  chat.style.display = "flex";
  let listStorage = JSON.parse(localStorage.getItem("conversation"));
  if (listStorage !== null) {
    messageList = listStorage;
  }
  if (messageList.length > 0) {
    messageList.map(function (mes) {
      createListMessages(mes);
    });
  }
}
function addMessage() {
  const message = {
    name: name,
    message: inputMessage.value,
  };
  console.log(message);
  messageList.push(message);
  localStorage.setItem("conversation", JSON.stringify(messageList));
  inputMessage.value = "";
  createListMessages(messageList[messageList.length - 1]);
}
function createListMessages(mes) {
  let divRoot = document.createElement("div");
  divRoot.className = "divRoot";

  let divName = document.createElement("div");
  divName.className = "divName";
  let divMessage = document.createElement("div");
  divMessage.className = "divMessage";

  divName.textContent = mes.name + " : ";
  divMessage.textContent = mes.message;
  divRoot.appendChild(divName);
  divRoot.appendChild(divMessage);
  listMessages.appendChild(divRoot);
}
window.onstorage = () => {
  let storeChange = JSON.parse(window.localStorage.getItem("conversation"));
  createListMessages(storeChange[storeChange.length - 1]);
};
