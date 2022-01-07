const mongoose = require("mongoose")
const Conversation = require('../models/conversation')
const Message = require("../models/message")

const DEFAULT_MESSAGE_LIMIT = 10

async function getMessages(req, res) 
{
    try 
    {
        const { query, user, params } = req
        const { limit } = query
        const { conversationId } = params
    
        if(!conversationId)
        {
            return res.status(400).json({ error: "Conversation id is missing in query" })
        }


        const conversation = await Conversation.findOne({_id: mongoose.Types.ObjectId(conversationId), users: mongoose.Types.ObjectId(user.id)})

        if(!conversation)
        {
            return res.status(404).json({error: "No conversation found"})
        }

        const messages = await Message.find({
            conversation: conversation._id
        }).sort("-createdAt").limit(limit || DEFAULT_MESSAGE_LIMIT)

        return res.status(200).json({ messages })

    }
    catch(e)
    {
        return res.status(500).json({error: "An error occured while fetching messages"})
    }
}

module.exports = {
    getMessages
}