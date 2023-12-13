import __dirname from '../utils.js'
import path from 'path'
import { Router } from 'express'
export const router = Router()
import { cartsMongo } from '../dao/managerCartsMongo.js'
import { CartModelo } from '../dao/models/cartsModelo.js'
import { error } from 'console'



const cm = new cartsMongo()

router.get('/:id', async(req, res) => {
let id = req.params.id
let respuesta = await CartModelo.findById(id)
console.log(respuesta)

if(!respuesta || respuesta == null) return res.status(400).json("El carrito no fue encontrado")
else{res.status(200).json(respuesta)}

})
router.post("/", async(req, res) => {
    let create = await cm.createCart()
    if (!create) return res.status(400).json("Error de creacion de carrito")
     console.log(create)
    return res.status(200).json(`Creacion exitosa!! El id de su carrito es: ${create}`)

})
router.post('/:id/product/:product', async(req, res) => {

    let id = req.params.id
    let prodId = req.params.product

    let respuesta = await cm.addProductsCart(id, prodId)
    console.log(respuesta)

    if (!respuesta || respuesta == null) return res.status(400).json("Error a cargar el producto, error en valores id")
    else {
        return res.status(200).json("Tu producto ha sido agregado con exito")
    }

})