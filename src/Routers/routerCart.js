import __dirname from '../utils.js'
import path from 'path'
import { Router } from 'express'
export const router = Router()
import { cartsMongo } from '../dao/managerCartsMongo.js'



const cm = new cartsMongo()

router.get('/:id', (req, res) => {
let id = parseInt(req.params.id)
let respuesta = cm.getProductId(id)

if(respuesta == -1) return res.status(400).json("El carrito no fue encontrado")
else{res.status(200).json(respuesta)}

})
router.post("/", (req, res) => {
    let create = cm.createCart()
    console.log(create)
    let resultado = create.id
    if (!create) return res.status(400).json("Error de creacion de carrito")

    return res.status(200).json(`Creacion exitosa!! El id de su carrito es: ${resultado}`)

})
router.post('/:id/product/:product', (req, res) => {

    let idC = req.params.id
    let prodId = req.params.product

    let respuesta = cm.addProductsCart(idC, prodId)

    if (!respuesta) return res.status(400).json("No se ha podido agrear el producto al carrito")
    else {
        return res.status(200).json("Tu producto ha sido agregado con exito")
    }

})