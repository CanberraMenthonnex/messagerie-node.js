const express = require('express');
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

module.exports = {
    getUsers
}
