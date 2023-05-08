let socket = io();

const url = window.location.href;

if (url.includes("room")) {
    console.log("chat page");
} else if (url.includes("error")) {
    console.log("error page");
} else {
    const usernameInput = document.querySelector("#username");
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
            console.log('input element: ' + roomNumberInput);

            const roomNumber = roomNumberInput.value;
            console.log('roomnumber' + roomNumber);

            // Emit the joinRoom event to the server with the username and room number
            socket.emit("joinRoom", { roomNumber: roomNumber, username: username, res: null });
        }

        event.preventDefault();
    });


    // form.addEventListener("submit", (e) => {
    //     const username = readValues();
    //     // console.log(username);
    //     e.preventDefault();

    //     const randomnumber = generateRoomNumber();
    //     const roomnumber = randomnumber.toString();

    //     // Emit the createRoom event to the server with the username
    //     socket.emit("createRoom", roomnumber, username);
    // });

    // joinRoomBtn.addEventListener("click", (e) => {
    //     e.preventDefault();

    //     const username = usernameInput.value;
    //     const roomNumber = roomNumberInput.value;

    //     // Emit the joinRoom event to the server with the username and roomNumber
    //     socket.emit("joinRoom", {
    //         username,
    //         roomNumber,
    //     });
    //});


    function readValues() {
        const username = usernameInput.value;
        return username;
    }
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
