import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}
const getUserIdFromSocket = (socketId) => {
	// Iterate through userSocketMap to find the user ID associated with the given socket ID
	for (const [userId, id] of Object.entries(userSocketMap)) {
	  if (id === socketId) {
		return userId;
	  }
	}
	return null; // Return null if the user ID is not found
  };
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;


	socket.on("typing", (receiverId) => {
		const senderId = getUserIdFromSocket(socket.id);
		io.to(userSocketMap[receiverId]).emit("typing", senderId);
	  });
	
	  socket.on("stopTyping", (receiverId) => {
		const senderId = getUserIdFromSocket(socket.id);
		io.to(userSocketMap[receiverId]).emit("stopTyping", senderId);
	  });
	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };