let socket = io();

const url = window.location.href;
const usernameInput = document.querySelector("#username");

if (url.includes("room")) {
    console.log("chat page");

    let messages = document.querySelector('section ul');
    let inputText = document.querySelector('input#message');
    let send = document.querySelector('button#send');
    // let typingState = document.querySelector('.room>section>p');

    // Read the username from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const roomNumber = url.split('/').pop().split('?')[0];
    console.log(roomNumber);

    socket.emit("rejoinRoom", roomNumber, username);

    // send text
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        let data = { name: username, message: inputText.value, roomNumber: roomNumber }
        socket.emit('chat', data);

        inputText.value = '';
    })

    // inputText.addEventListener('keypress', () => {
    //     socket.emit('typing', inputName.value)
    // })

    socket.on('chat', (data) => {
        console.log(data);
        messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }));
        // typingState.innerHTML = "";
        // messages.scrollTop = messages.scrollHeight;
    })

    // socket.on('typing', (inputName) => {
    //     console.log(inputName);
    //     typingState.innerHTML = (inputName + " is aan het typen...")
    //     setTimeout(() => {
    //         typingState.innerHTML = "";
    //     }, 3000);
    // })


} else if (url.includes("error")) {
    console.log("error page");
} else {
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        const username = readValues();
        const roomNumber = generateRoomNumber().toString();

        const submitter = event.submitter;
        const button = submitter.id;

        if (button === "create-room-btn") {
            console.log('create-room-btn');
            // Emit the createRoom event to the server with the username
            socket.emit("createRoom", roomNumber, username);
        } else if (button === "join-room-btn") {
            console.log('join-room-btn');

            const roomNumberInput = document.querySelector("#room-number");
            console.log(username + ' : ' + roomNumberInput);

            const roomNumber = roomNumberInput.value;
            console.log('roomnumber' + roomNumber);

            // Emit the joinRoom event to the server with the username and room number
            socket.emit("joinRoom", { roomNumber: roomNumber, username: username, res: null });
        }

        function readValues() {
            const username = usernameInput.value;
            return username;
        }

        event.preventDefault();
    });

}


// Generate a random room number
function generateRoomNumber() {
    let roomNumber = Math.floor(Math.random() * 9000) + 1000;
    return roomNumber;
}


socket.on("roomCreated", (roomNumber, username) => {
    console.log(`Room ${roomNumber} created by ${username}`);
    window.location.href = `/room/${roomNumber}?username=${username}`;
});

// Listen for the roomJoined event from the server
socket.on("roomJoined", ({ roomNumber, username }) => {
    console.log(`${username} joined room ${roomNumber}`);
    window.location.href = `/room/${roomNumber}?username=${username}`;
});

socket.on("roomNotFound", ({ roomNumber }) => {
    // Render the error page
    console.log(`Room ${roomNumber} does not exist`);
    window.location.href = `/error`;
});
