// let socket = io();
// let messages = document.querySelector('section ul');
// let inputText = document.querySelector('input#message');
// let inputName = document.querySelector('input#name');
// let send = document.querySelector('button#send');
// let typingState = document.querySelector('p');

// // send text
// document.querySelector('form').addEventListener('submit', event => {
//   event.preventDefault()
//   let data = { name: inputName.value, message: inputText.value }
//   socket.emit('chat', data);

//   console.log(inputName.value, inputText.value);
//   inputText.value = '';
// })

// inputText.addEventListener('keypress', () => {
//   socket.emit('typing', inputName.value)
// })

// socket.on('history', (history) => {
//   history.forEach((data) => {
//     addMessage(data)
//   })
// })

// function addMessage(data) {
//   messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }))
//   messages.scrollTop = messages.scrollHeight
// }

// socket.on('chat', (data) => {
//   console.log(data);
//   messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }))
//   typingState.innerHTML= "";
//   messages.scrollTop = messages.scrollHeight
// })

// socket.on('typing', (inputName) => {
//   console.log(inputName);
//   typingState.innerHTML= ( inputName + " is aan het typen...")
//   setTimeout(() => {
//     typingState.innerHTML= "";
//   }, 3000);
// })


const messageInput = document.getElementById('message-input');
const messageForm = document.getElementById('message-form');
const chatMessages = document.getElementById('chat-messages');

const username = prompt('What is your name?');

const socket = io();

socket.emit('user-join', username);

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('chat-message', message);
  messageInput.value = '';
});

socket.on('user-joined', (username) => {
  displayMessage({ sender: 'Server', time: getTime(), content: `${username} joined the chat` });
});

socket.on('chat-message', (data) => {
  displayMessage(data);
});

function displayMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  if (message.sender === username) {
    div.classList.add('sent-message');
  } else {
    div.classList.add('received-message');
  }
  div.innerHTML = `<p class="message-header">${message.sender}: <span class="message-time">${message.time}</span></p><p class="message-body">${message.content}</p>`;
  chatMessages.appendChild(div);
}

function getTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return time;
}