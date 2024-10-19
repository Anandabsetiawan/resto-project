const { comparePassword } = require('../helper/bcrypt')
const { signToken, verifyToken } = require('../helper/jwt')
const { User, Menu, Order } = require('../models/index')


module.exports = class UserController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body

            let newUser = await User.create({ email, password })

            res.status(201).json({ message: `New User with Email ${newUser.email} been registered successfully` })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next) {

        const { email, password } = req.body
        console.log(req.body);
        try {

            if (!password) {
                throw { name: "Invalid input" }
            }
            if (!email) {
                throw { name: "Invalid input" }
            }
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw { name: "Invalid User" }
            }
            let validPassword = comparePassword(password, user.password)

            if (!validPassword) {
                throw { name: "Invalid User" }
            }
            const token = signToken({
                id: user.id
            })
            res.status(200).json({
                access_token: token,
                email: email,
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
}
