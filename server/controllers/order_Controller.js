const { where, Model } = require('sequelize');
const { User, Order, Menu } = require('../models/index')

module.exports = class OrderController {
    static async getOrder(req, res, next) {
        console.log(req.params);

        try {
            let order = await Order.findAll({
                where: {
                    UserId: req.user.id
                },
                include: {
                    model: Menu,
                    attributes: ['id', 'name', 'price', 'description', 'imageUrl']
                }
            })
            if (!order) {
                throw { name: 'Menu 404' }
            }
            res.status(200).json(order)
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
    static async addOrder(req, res, next) {
        try {
            const { menuId } = req.body
            const userId = req.user.id
            const [order, create] = await Order.findOrCreate({
                where: {
                    MenuId: req.body.MenuId,
                    UserId: userId
                },
                defaults: {
                    quantity: 1,
                },
                include: {
                    model: Menu,
                    where: {
                        id: menuId
                    }
                }
            })

            if (!menuId) {
                throw { name: 'Menu 404' }
            }
            if (!create) {
                await order.increment('quantity', { by: 1 })
            }
            return res.status(201).json(order)
        } catch (error) {
            next(error)
        }
    }
    static async deleteOrder(req, res, next) {
        try {
            const order = await Order.findOne({
                where: {
                    MenuId: req.body.MenuId,
                    UserId: req.user.id,
                }
            })
            if (order) {
                await order.decrement('quantity', { by: 1 })
                if (order.quantity === 0) {
                    await Order.destroy({
                        where: {
                            MenuId: req.body.MenuId,
                            UserId: req.user.id,
                        }
                    })
                    return res.status(200).json()
                }
            }
            res.status(200).json(order)
        } catch (error) {
            console.log(error);

            next(error)
        }
    }
}