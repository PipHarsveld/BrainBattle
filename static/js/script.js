let socket = io();

const url = window.location.href;

if(url.includes("room")) {
    console.log("chat page");
}else if (url.includes("error")) {
    console.log("error page");
} else {
    const createRoomBtn = document.querySelector("#create-room-btn");
    const joinRoomBtn = document.querySelector("#join-room-btn");
    const roomNumberInput = document.querySelector("#room-number");
    const usernameInput = document.querySelector("#username");
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        const username = readValues();
        // console.log(username);
        e.preventDefault();
    
        const randomnumber = generateRoomNumber();
        const roomnumber = randomnumber.toString();
    
        // Emit the createRoom event to the server with the username
        socket.emit("createRoom", roomnumber, username);
    });

    joinRoomBtn.addEventListener("click", (e) => {
        e.preventDefault();
    
        const username = usernameInput.value;
        const roomNumber = roomNumberInput.value;
    
        // Emit the joinRoom event to the server with the username and roomNumber
        socket.emit("joinRoom", {
            username,
            roomNumber,
        });
    });

    function readValues() {
        const username = usernameInput.value;
        // const roomNumber = roomNumberInput.value;
        console.log(username);
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

socket.on("roomNotFound", ({ roomNumber }) => {
    // Render the error page
    console.log(`Room ${roomNumber} does not exist`);
    window.location.href = `/error`;
});



// Listen for the roomJoined event from the server
socket.on("roomJoined", ({ roomNumber, username }) => {
    console.log(`${username} joined room ${roomNumber}`);
    console.log(roomNumber)
    window.location.href = `/room/${roomNumber}`;
});