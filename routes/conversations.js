const express = require("express");
const { createConversation, getConversations, deleteConversation, updateConversation } = require("../controllers/conversations");
const {auth} = require("../middlewares/auth")
const router = express.Router()

router.use(auth)

router.post('/', createConversation)

router.put("/", updateConversation)

router.get("/", getConversations)

router.delete("/", deleteConversation)

module.exports = router