const { Server }= require("socket.io")
const Message = require("../models/message")
const { socketAuth } = require("../middlewares/auth")
const mongoose = require("mongoose")

function initSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3001",
          },
    })

    io.on('connection', (socket) => {
        
        socket.use(socketAuth)
        
        socket.on("join-room", ({conversation}) => {
            console.log("User joined room " + conversation);
            socket.join(conversation)
        })

        socket.on("message", async ({message, conversation, auth}) => {
            console.log({message, conversation});
            
            const messageDoc = new Message({
                expeditor : mongoose.Types.ObjectId(auth.user.id),
                value: message,
                conversation: mongoose.Types.ObjectId(conversation),
                createdAt: new Date()
            })
            
            await messageDoc.save()

            io.in(conversation).emit("message",{message: messageDoc})
        })

        socket.on('disconnect', () => {
            console.log("User disconnected");
        })

    })


}

module.exports = {
    initSocket
}