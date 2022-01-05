const jwt = require("jsonwebtoken")

const BEARER_KEYWORD = "Bearer "

function auth(req, res, next) {
    try {
        const { headers } = req
        const { authorization } = headers

        let error = false

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
        return res.status(500).json({error: e})
    }
}


module.exports = {
    auth
}