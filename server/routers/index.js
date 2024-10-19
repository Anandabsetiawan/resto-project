const express = require('express')
const UserController = require('../controller/user_Controller')
const MenuController = require('../controller/menu_Controller')
const OrderController = require('../controller/order_Controller')
const authentication = require('../middleware/authentication')
const router = express.Router()
const cors = require('cors')

router.use(cors())

// post /register 
router.post('/register', UserController.register)
// post /login
router.post('/login', UserController.login)


router.use(authentication)
//get/menu
router.get('/menus', MenuController.getAllMenu)
//get/menu/detail
router.get('/menus/:id', MenuController.getMenuById)
//post/order
router.get('/order/:id', OrderController.getOrder)
router.post('/order', OrderController.addOrder)
//delete/order
router.delete('/order', OrderController.deleteOrder)

module.exports = router