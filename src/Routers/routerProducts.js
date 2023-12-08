import __dirname from '../utils.js'
import path from 'path'
import { Router } from 'express'
export const router = Router()
import { ProductsMongo } from '../dao/managerProductsMongo.js'
import { io } from '../app.js'

const mongo = new ProductsMongo()

router.get('/', async(req, res) => {
    let productos = await mongo.getProduct()
    if (req.query.limit === "") return res.status(200).send({ productsM })
    else {
        let limitation = productos.slice(0, req.query.limit)
        res.status(200).send(limitation)
    }

})

router.get('/:id', async(req, res) => {

    let id = parseInt(req.params.id)

    try {
         
        let product = await mongo.getProductById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json("El id ingresado no se en encuentra en la BD")
    }

})

router.post('/', async (req, res) => {

    let body = req.body
    let productsM = await mongo.getProduct()
    let exist = productsM.find(x => x.code === body.code)
    if (exist) res.status(400).json("El code esta en uso")

    const date = ['title', 'description', 'price', 'code', 'stock', 'category']

    let filter = date.filter(x => !(x in body));

    if (filter.length > 0) {

        return res.status(400).json("No has ingresado todos los campos");

    }

    const typeDate = {

        title: 'string',
        description: 'string',
        code: 'string',
        price: 'number',
        status: 'boolean',
        stock: 'number',
        category: 'string'

    }

    let incorrectDate = Object.entries(typeDate).reduce((acc, [date, type]) => {
        if (body[date] !== undefined) {
            if (typeof body[date] !== type) acc.push(date)
        } return acc
    }, [])

    if (incorrectDate.length > 0) return res.status(400).json("Los datos ingresados en un tipo de dato invalido")

    const thumbnails = body.thumbnails || []


    body.status = body.status || true
    if (!Array.isArray(thumbnails)) return res.status(400).json("El campo thumbnails es  inválido ")

    let product = body


    let respuesta = await mongo.addProducts(product);
    if (!respuesta) return res.status(400).json("No se ha podido agregar el producto")
    else {
        res.status(200).json("Producto ingresado correctamente:")
        io.emit("newProduct", respuesta)
    }

})

router.put('/:id', async (req, res) => {
    let modify = req.body
    let id = parseInt(req.params.id)

    let respuesta = await mongo.update(id, modify)

    if (!respuesta) res.status(400).json("No se ha podido actualizar el producto")
    else {
        res.status(200).json("Actualizado con exito")

    }

})

router.delete("/:id", async(req, res) => {
    let id = parseInt(req.params.id)
    let respuesta = await mongo.deleteProduct(id)

    if (!respuesta) return res.status(400).json("Error al eliminar, vuelva intentar")
    else {
        res.status(200).json(`El producto con id ${id} ha sido eliminado`)
        io.emit("delete", id)
    }
    console.log(id)
})