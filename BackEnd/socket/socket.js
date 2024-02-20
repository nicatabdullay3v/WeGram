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

const userSocketMap = {}; 
const getUserIdFromSocket = (socketId) => {
	for (const [userId, id] of Object.entries(userSocketMap)) {
	  if (id === socketId) {
		return userId;
	  }
	}
	return null; 
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
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };