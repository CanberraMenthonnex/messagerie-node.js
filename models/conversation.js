const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    users: [
        { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    ],
    name: { type: String },
    createdAt: { type: Date, default: new Date() }
})

module.exports = mongoose.model("conversation", conversationSchema)