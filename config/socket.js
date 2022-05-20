const app = require("express")();
const httpServer = require("http").createServer(app);

// Handeling cors 
const io = require("socket.io")(httpServer, {
    cors: {
      origin: process.env.ORIGIN_URL,
      methods: ["GET", "POST"]
    }
  });

io.on("connection", socket => {
    console.log("Connected ")
});

httpServer.listen(process.env.SOCKET_PORT);

module.exports = io;