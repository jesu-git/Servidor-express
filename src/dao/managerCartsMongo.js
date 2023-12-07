
import { CartModelo } from "./models/cartsModelo.js"
import { ProductsMongo } from "./managerProductsMongo.js"

const pm = new ProductsMongo()
const cm = new CartModelo()
export class cartsMongo {

    getCart() {

        try {

            return CartModelo.find().lean()

        } catch (error) {

            console.log("No hay carritos en BD..")
        }


    }

    createCart() {

        let carts = this.getCart()

        let id = Math.max(carts.map(x => x.id), 0) + 1
        let productsCart = []


        let cart = {
            id,
            productsCart,

        }


        let cartsMongo = cm.create(cart)
        return cart

    }

    addProductsCart(idC, prodId) {

        let carts = this.getCart()
        let products1 = pm.getProduct()

        let existProduct = products1.find(x => x.id == prodId)
        if (!existProduct) return console.log("El producto ingresado no existe en la BD")


        let existCart = carts.findIndex(x => x.id == idC)
        if (existCart == -1) return console.log("El carrito ingresado no existe")

        let cart = carts[existCart]

        let exist_quantity = cart.productsCart.findIndex(x => x.id == prodId)
        console.log(exist_quantity)
        if (exist_quantity == -1) {

            cart.productsCart.push({ id: parseInt(prodId), quantity: 1 })

        } else {

            cart.productsCart[exist_quantity].quantity++;

        }

        let cartAdd = cm.updateOne({ idC: id }, prodId)
        return cart
    }

    getProductId(id) {

        try {

            let carts = cm.findOne({ id: id })
            return carts

        } catch (error) {

            console.log("NO existe el carrito indicado", error.menssage)
        }




    }
}

