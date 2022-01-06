const express = require("express");
const { createConversation, getConversations, deleteConversation, updateConversation } = require("../controllers/conversations");
const { getMessages } = require("../controllers/messages");
const { auth } = require("../middlewares/auth")
const router = express.Router()

router.use(auth)

router.post('/', createConversation)

router.put("/:id", updateConversation)

router.get("/", getConversations)

router.delete("/:id", deleteConversation)

router.use("/:conversationId/messages", getMessages)

module.exports = router