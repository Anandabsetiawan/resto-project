const { verifyToken } = require('../helper/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
    try {
        let accessToken = req.headers.authorization

        if (!accessToken) {
            throw { name: "invalid token" }
        }
        let [Bearer, token] = accessToken.split(" ")

        if (Bearer !== "Bearer") {
            throw { name: "invalid token" }
        }
        // console.log(token, "token auth<<<<<");
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        // console.log(user, "ini di auth user");
        if (!user) {
            throw { name: "User 404" }
        }
        req.user = {
            id: user.id,
            role: user.role
        }
        next()
    } catch (error) {
        console.log(error, "error auth<<<<<1");
        next(error)
    }
}

module.exports = authentication