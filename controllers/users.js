const mongoose = require("mongoose")
const User = require('../models/user')

const DEFAULT_USER_LIMIT = 10

/* GET users listing. */
async function getUsers(req, res) {
  try {
    const { username, limit } = req.query
    const filter = {}

    if (username) {
      filter.username = {
          "$regex": username,
          "$options": "i"
      }
    }

    const users = await User.find(filter, "username").limit(limit || DEFAULT_USER_LIMIT)

    return res.status(200).json({users})
  }
  catch (e) {
    return res.status(500).json({error: "Error occured while fetching users"})
  }
}

async function getUser(req, res)
{
  try 
  {
    const user = await User.findOne({_id : mongoose.Types.ObjectId(req.user.id)})

    if(!user)
    {
      return res.status(404).json({error: "User not found"})
    }

    return res.status(200).json({user})
  }
  catch(e)
  {
    console.log(e);
    return res.status(500).json({error: "Error occured while fetching user"})
  }
}

module.exports = {
    getUsers, 
    getUser
}
