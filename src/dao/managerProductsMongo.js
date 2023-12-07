import { productModelo } from "./models/productModelo.js"
import mongoose from 'mongoose'

const productoModelo = new productModelo()

export class ProductsMongo {

    async getProduct() {

        try {
            return await productModelo.find().lean()
        } catch (error) {
            console.log("ocurrio un error:",error.message)
            return null
        }

    }
    async addProducts(product) {

        let all_products = await this.getProduct()


        let id = Math.max(all_products.map(x => x.id), 0) + 1


        let productNew = { id, ...product }
        if (Object.keys(productNew).length > 9) return console.log("Has ingresados más campos de los requeridos")

        try {

            let productoMongo = productModelo.create(productNew)
            return productNew

        } catch (error) {

            console.log("Creacion de producto SIN exito")
        }

    }
    async getProductById(id) {


        try {
            let products = await productModelo.findOne({ id: id })

            return products
        } catch (error) {
            console.log(`El producto con id ${id} no existe`)
        }



    }
    async deleteProduct(id) {

        try {
            let product = productModelo.findOne({ id: id })
            if(product){
                let productModific = await productModelo.deleteOne({ id: id })
                return id

            }
        }
        catch (error) {
            console.log(error.message)
        }

    }
    async update(id, obj) {

        try {
            let product = productModelo.findOne({ id: id })

        }
        catch (error) {
            console.log("El id no se ecuentra en BD..")
        }


        const checkObj = (obj) => {
            return obj === Object(obj);
        };


        if (!checkObj) {
            console.log("No es un objeto");
            return;
        }

        const keys = Object.keys(obj);
        let checkCode = keys.find(x => x === "code")

        if (checkCode) {
            let codeC = all_products1.find(x => x.code == obj.code)

            if (codeC) return console.log("El code utilizado ya esta en uso")
        }


        const keys_old = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"]

        try {

            keys.forEach((date) => {

                let dato = keys_old.includes(date)


                if (!dato) {


                    throw new error("hubo error")

                }

            })
        } catch (error) {

            console.log("Verifique sus campos, no son correctos")
            return
        }
        try {
            let productModific = await productModelo.updateOne({ id: id }, obj)
            return id
        } catch (error) {

            console.log("No se pudo modificar el producto")

        }

    }
}




