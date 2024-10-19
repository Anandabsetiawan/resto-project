const { comparePassword, hashPassword } = require('../helpers/bcrypt')
const { signToken} = require('../helpers/jwt')
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
    static async changePassword(req, res, next) {
        try {
            const {oldPassword, newPassword } = req.body

            const id = req.user.id
            const user = await User.findByPk(id)

            if (!user) {
                throw { name: "Invalid User" }
            }
            const validPassword = comparePassword(oldPassword, user.password)
            
            if (!validPassword) {
                throw { name: "Invalid User" }
            }
            const newPasswordHash = hashPassword(newPassword)
            await User.update({ password: newPasswordHash }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: "Password has been changed" })
        } catch (error) {
            next(error)
        }
    }
}
