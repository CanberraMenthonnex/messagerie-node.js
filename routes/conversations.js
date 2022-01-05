const express = require("express");
const { createConversation } = require("../controllers/conversations");
const {auth} = require("../middlewares/auth")
const router = express.Router()

router.use(auth)

router.post('/', createConversation)

module.exports = router