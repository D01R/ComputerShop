const ApiError = require("../error/ApiError")
const { ProductBasket, Product, Basket } = require("../models/models")

class BasketController{
    async getProducts(req,res,next){
        try{
            const userId = req.user.id

            const basket = await Basket.findOne({
                where: {userId},
                include: [{
                    model: ProductBasket,
                    as: 'productsBasket',
                    include: [{
                        model: Product,
                        required: true,
                        as: 'product'
                    }]
                }]
            })

            return res.json(basket)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteProductBasket(req,res,next){
        const id = Number(req.params.id)
        try{
            const result = await ProductBasket.destroy({
                where: {id: id}
            })
            return res.status(200).json({message: 'Deleted successfully'})
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()