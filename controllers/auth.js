const User = require("../models/user")
const validator = require("validator")
const bcrypt = require("bcrypt")
const { SALT_ROUNDS } = require("../constants/hash")
const jwt = require("jsonwebtoken")

async function register(req, res) {
    try {
        const { body } = req
        const { username, mail, password } = body

        let error = null

        if (!validator.isEmail(mail)) {
            error = "The mail field isn't valid"
        }

        if (!validator.isLength(username, { min: 5 })) {
            error = "The username must have a min of 5 characters"
        }

        if (!validator.isStrongPassword(password, {minSymbols: 0})) {
            error = "The password isn't enough strong"
        }

        if (error) {
            return res.status(400).json({ error })
        }

        //Check if user already exist with mail or/and username
        const existingUser = await User.findOne({
            $or: [
                { mail },
                { username }
            ]
        })  

        if (existingUser) {
            return res.status(400).json({ error: "The user already exists with given username or mail" })
        }

        //Create user
        const user = new User({
            username,
            mail,
            password: await bcrypt.hash(password, SALT_ROUNDS)
        })

        await user.save()

        console.log(body);
        return res.status(200).json({user})
    }
    catch (e) {
        return res.status(500).json({error: "An error occured while registering"})
    }

}

async function login(req, res) { 
    try {
        const { body } = req 
        const { mail, password } = body 

        const user = await User.findOne({mail})

        if(!user) 
        {
            return res.status(400).json({error: "User not found"})
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password)

        if(passwordIsCorrect)
        {
            //Generate jwt token
            const token = jwt.sign({mail, username: user.username, id: user._id}, process.env.PRIVATE_TOKEN_KEY, {expiresIn: "1d"})
            return res.status(200).json({ token })
        }

        return res.status(401).json({ error: "Bad authentification" })

    }
    catch(e) 
    {
        return res.status(500).json({error: "An error occured while logining"})
    }
}


module.exports = {
    register,
    login
}
