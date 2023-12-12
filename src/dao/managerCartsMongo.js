
import { CartModelo } from "./models/cartsModelo.js"
import { ProductsMongo } from "./managerProductsMongo.js"
import { productModelo } from "./models/productModelo.js"

const mongo = new ProductsMongo()

export class cartsMongo {

    async getCart() {

        try {

            return await CartModelo.find().lean()

        } catch (error) {

            console.log("No hay carritos en BD..")
        }


    }

    async createCart() {
        try {
            let carts = await this.getCart()
            let id = Math.max(...carts.map(x => x.id), 0) + 1
            let productCarts = []


            let cart = {
                id,
                productCarts,

            }


            let cartsMongo = await CartModelo.create(cart)
            return id


        } catch (error) {

            console.log("No se pudo crear el carrito", error.message)
        }




    }

    async addProductsCart(idC, prodId) {

        try {
            let existProduct = await productModelo.findOne({ id: prodId })
            if (existProduct == null) return null

        } catch (error) {

            console.log("No se encontro su producto")

        }

        try {

            let cart = await CartModelo.findOne({ id: idC })
            let product = cart.productCarts.find(x => x.productId == prodId)
            console.log(product)
            if (product !== undefined) {

                let index = cart.productCarts.findIndex(x => x.productId == prodId)
                cart.productCarts[index].quantity += 1

                await CartModelo.findOneAndUpdate({ id: idC },{ $set: { 'productCarts': { productId: prodId, quantity: product.quantity++ } } })

                return cart
            }

            if (product == undefined) {

                await CartModelo.updateOne({ id: idC }, { $push: { 'productCarts': { productId: prodId, quantity: 1 } } })
                return idC
            }
        } catch (error) {

            console.log("Error al agregar producto", error.message)

        }
    }




    async getProductId(id) {

        try {

            let carts = await CartModelo.findOne({ id: id }).lean()
            return carts

        } catch (error) {

            console.log("NO existe el carrito indicado", error.menssage)
        }




    }
}

