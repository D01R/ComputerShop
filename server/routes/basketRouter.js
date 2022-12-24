const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/',authMiddleware, basketController.getProducts)

module.exports = router