const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    users: [
        { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    ],
    name: { type: String }
})

module.exports = mongoose.model("conversation", conversationSchema)