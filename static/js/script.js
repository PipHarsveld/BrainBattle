let socket = io();
const createRoomBtn = document.querySelector("#create-room-btn");
const joinRoomBtn = document.querySelector("#join-room-btn");
const roomNumberInput = document.querySelector("#room-number");
const usernameInput = document.querySelector("#username");

function generateRoomNumber () {
    let roomNumber = Math.floor(Math.random() * 9000) + 1000;
    return roomNumber;
};


createRoomBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const randomnumber = generateRoomNumber();
    const roomnumber = randomnumber.toString();

    // Emit the createRoom event to the server
    socket.emit("createRoom", roomnumber);
});

socket.on("roomCreated", (roomNumber) => {
    console.log(`Room ${roomNumber} created`);
    window.location.href = `/room/${roomNumber}`;
});

joinRoomBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const roomNumber = roomNumberInput.value;

    // Emit the joinRoom event to the server
    socket.emit("joinRoom", {
        username,
        roomNumber,
    });

    // Listen for the roomJoined event from the server
    socket.on("roomJoined", ({ roomNumber, username }) => {
        console.log(`${username} joined room ${roomNumber}`);
        console.log(roomNumber)
        window.location.href = `/room/${roomNumber}`;
    });
});

