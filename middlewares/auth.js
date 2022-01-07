const jwt = require("jsonwebtoken")

const BEARER_KEYWORD = "Bearer "

function auth(req, res, next) {
    try {
        const { headers } = req
        const { authorization } = headers

        let error = false

        if(!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" })
        }

        const tokenParts = authorization.split(BEARER_KEYWORD)

        if (tokenParts.length < 2) {
            error = true
        }
        const token = tokenParts[1]
        const tokenIsValid = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY)
     
        if (!tokenIsValid) {
            error = true
        }

        if (error) {
            return res.status(400).json({ error: 'Bad Auth' })
        }
        
        req.user = tokenIsValid

        return next()
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({error: e.message})
    }
}

function socketAuth(socket, next) 
{
    console.log(socket);
    const payload = socket[1]
    const {token} = payload

    const tokenIsValid = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY)

    if(!tokenIsValid)
    {
       return next(new Error("Invalid credential"))
    }

    socket[1].auth = {user: tokenIsValid}

    console.log("User connected");

    return next()
}

module.exports = {
    auth,
    socketAuth
}