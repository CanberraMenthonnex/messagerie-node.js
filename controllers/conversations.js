const mongoose = require("mongoose")
const User = require("../models/user")
const Conversation = require("../models/conversation")

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

        const connectedUser = await User.findOne({username: user.username})

        if(!connectedUser)
        {
            return res.status(400).json({error: "The connected user doesn't exist"})
        }

        //Check if given users exist
        const existingUser = await User.find({ _id: {
            $in: users.map(user => mongoose.Types.ObjectId(user))
        }})

        if(existingUser.length !== users.length) 
        {
            return res.status(400).json({error: "Some users don't exist"})
        }

        const conversation = new Conversation({
            name: name || "",
            users: existingUser
        })

        await conversation.save()

        return res.status(201).json({ conversation })

    }
    catch(e)
    {
        return res.status(500).json({ error: "An error occured while creating conversation" })
    }
}

function getConversations(req, res) 
{
    try 
    {

    }
    catch(e)
    {
        return res.status(500).json({ error: "An error occured while fetching conversations" })
    }
}

function updateConversation(req, res) 
{
    try 
    {

    }
    catch(e)
    {
        return res.status(500).json({ error: "An error occured while updating conversation" })
    }
}

function deleteConversation(req, res) 
{
    try 
    {

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