const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),productController.create)
router.get('/',productController.getAll)
router.get('/:id',productController.getOne)
router.post('/basket',authMiddleware,productController.addProductBasket)

module.exports = router