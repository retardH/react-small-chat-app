const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"],
    },
});
// the comment from the main branch, must be pulled
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // when join room event is emitted, the callback inside runs
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    // when send message event is emitted, the callback inside runs
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    // when disconnect event is emitted, the callback inside runs
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

// listen on port 5002
server.listen(5002, () => {
    console.log("SERVER RUNNING");
});