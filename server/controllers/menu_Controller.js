const { User, Order, Menu } = require("../models/index")

module.exports = class MenuController {
    static async getAllMenu(req, res, next) {
        try {
            let menus = await Menu.findAll()

            res.status(200).json(menus)
        } catch (error) {
            next(error)
        }
    }
    static async getMenuById(req, res, next) {
        console.log(req.params);
        try {
            let menu = await Menu.findByPk(req.params.id)
            if (!menu) {
                throw { name: 'Menu 404' }
            }
            res.status(200).json(menu)
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
}