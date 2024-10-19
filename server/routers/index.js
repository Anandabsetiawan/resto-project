const express = require('express')
const UserController = require('../controllers/user_Controller')
const MenuController = require('../controllers/menu_Controller')
const OrderController = require('../controllers/order_Controller')
const authentication = require('../middlewares/authentication')
const router = express.Router()
const cors = require('cors')

router.use(cors())

// post /register 
router.post('/register', UserController.register)
// post /login
router.post('/login', UserController.login)


router.use(authentication)
//change password
router.patch('/change-password', UserController.changePassword)
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