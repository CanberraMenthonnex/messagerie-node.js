const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "conversation" },
    expeditor: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdAt: { type: Date, default: new Date() },
    value: { type: String }
})

module.exports = mongoose.model("message", messageSchema)