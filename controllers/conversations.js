const mongoose = require("mongoose")
const User = require("../models/user")
const Conversation = require("../models/conversation")

const DEFAULT_CONVERSATION_LIMIT = 10

async function createConversation(req, res) 
{
    try 
    {
        const { body, user } = req 
        const { name, users } = body

        if(!users || !Array.isArray(users) || users.length === 0 || !users.every(user => typeof user === "string")) 
        {
            return res.status(400).json({error: "Users field is missing or it has bad informations"})
        }

        const conversationUserIds = [...users, user.id]

        console.log({conversationUserIds});

        //Check if given users exist
        const conversationUsers = await User.find({ _id: {
            $in: conversationUserIds.map(user => mongoose.Types.ObjectId(user))
        }})

        if(conversationUsers.length !== conversationUserIds.length) 
        {
            return res.status(400).json({error: "Some users don't exist"})
        }

        //check if conversation already exists
        const existingConversation = await Conversation.findOne({users: {
            $all: conversationUsers
        }})

        if(existingConversation) 
        {
            return res.status(400).json({ error: "The conversation already exists" })
        }

        //create the conversation
        const conversation = new Conversation({
            name: name || "",
            users: conversationUsers
        })

        await conversation.save()

        return res.status(201).json({ conversation })

    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({ error: "An error occured while creating conversation" })
    }
}

async function getConversations(req, res) 
{
    try 
    {
        let { limit, page } = req.query
        const { user } = req

        page = page || 0
        limit = limit || DEFAULT_CONVERSATION_LIMIT
        const conversations = await Conversation.find({users: user.id }).sort("createdAt").skip(limit * page).limit(limit).populate("users", ["_id", "username"])

        return res.status(200).json({conversations})
    }
    catch(e)
    {
        return res.status(500).json({ error: "An error occured while fetching conversations" })
    }
}

async function updateConversation(req, res) 
{
    try 
    {
        const { body, params, user } = req 
        const { name } = body 
        const { id } = params

        if(!name) 
        {
            return res.status(400).json({ error: "Name field is missing" })
        }

        if(!id)
        {
            return res.status(400).json({ error: "Id query is missing" })
        }

        const conversation = await Conversation.findOne({_id: mongoose.Types.ObjectId(id), users: mongoose.Types.ObjectId(user.id)})

        if(!conversation)
        {
            return res.status(404).json({error: "No conversation found"})
        }

        conversation.name = name 

        await conversation.save()

        return res.status(200).json({conversation})

    }
    catch(e)
    {
        return res.status(500).json({ error: "An error occured while updating conversation" })
    }
}

async function deleteConversation(req, res) 
{
    try 
    {
        const { user, params } = req 
        const { id } = params

        const conversation = await Conversation.findOne({_id: mongoose.Types.ObjectId(id), users: mongoose.Types.ObjectId(user.id)})

        if(!conversation)
        {
            return res.status(404).json({error: "No conversation found"})
        }

        await conversation.remove()

        return res.status(200).json({conversation})

    }
    catch(e)
    {
        return res.status(500).json({ error: "An error occured while removing conversation" })
    }
}


module.exports = {
    createConversation,
    getConversations,
    updateConversation,
    deleteConversation
}