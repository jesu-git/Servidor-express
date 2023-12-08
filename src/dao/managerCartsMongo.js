
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
            let productsCart = []


            let cart = {
                id,
                productsCart,

            }


            let cartsMongo = await CartModelo.create(cart)
            return id


        } catch (error) {

            console.log("No se pudo crear el carrito", error.message)
        }




    }

    async addProductsCart(idC, prodId) {


        try {
            let cart = await CartModelo.find({ id: idC }).lean()
            console.log(cart)

        } catch (error) {

            console.log("Error, carrito no valido", error.menssage)

        }
        try {
            let product = await productModelo.find({ id: prodId }).lean()
            console.log(product)
        } catch (error) {

            console.log("Error, producto no se encuentra en DB..", error.menssage)

        }

        try {
            let exist_quantity = await cart.productsCarts.find({ productId: productModelo.id })
            if (exist_quantity == -1) {

                cart.productsCarts.push({ id: parseInt(product.id), quantity: 1 })

            } else {

                cart.productsCarts.quantity++;

            }
        } catch (error) {
          console.log("No se puede agregar producto alcarrito", error.menssage)
        }

        let cartAdd = await CartModelo.updateOne({ id: idC }, { cart })
        return cart
    }

    getProductId(id) {

        try {

            let carts = CartModelo.findOne({ id: id })
            return carts

        } catch (error) {

            console.log("NO existe el carrito indicado", error.menssage)
        }




    }
}

