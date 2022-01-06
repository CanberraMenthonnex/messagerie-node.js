const express = require('express');
const { getUsers, getUser } = require('../controllers/users');
const { auth } = require("../middlewares/auth")
const router = express.Router();


router.use(auth)

router.get('/', getUsers);

router.get('/profile', getUser)

module.exports = router;
