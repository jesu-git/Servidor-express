import path from 'path'
import __dirname from '../utils.js'
import { Router } from 'express'
import { productModelo } from '../dao/models/productModelo.js'
import { ProductsMongo } from '../dao/managerProductsMongo.js'
export const router = Router()
import { io } from '../app.js'
import mongoose from 'mongoose'
import { CartModelo } from '../dao/models/cartsModelo.js'

let mongo = new ProductsMongo()

router.get('/', (req, res) => {

    res.status(200).render("home", { titulo: "home page", products })

})

router.get("/chat", (req, res) => {

    res.status(200).render('chat')

})


router.get('/realtimeproducts', async (req, res) => {

    let products = await mongo.getProduct()
    console.log(products)

    res.status(200).render('websocket', { products, titulo: "Web socket" })

})

router.get("/products", async (req, res) => {

    try {

        let { limit = 10, sort = {}, page = 1 } = req.query
        let sortValue = {}
        if (sort === "asc") {
            sortValue = { price: 1 };
        } else if (sort === "desc") {
            sortValue = { price: -1 }
        }

        let category = req.query.category

        let products = await productModelo.paginate({ ...category }, { limit: limit, page: page, sort: sortValue,lean:true })
        let { totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = products

        res.status(200).render('product',{data:products.docs,totalPages, hasNextPage, hasPrevPage, prevPage, nextPage, limit, page, sort})

    } catch (error) {

        res.status(400).json("Error, no se pudo renderizar la pagina")

    }

})


router.get("/cart/:cartId", async (req, res) => {
    try {
        let cartId = req.params.cartId
        let cart = await CartModelo.findById(cartId).populate('productCarts.productId').lean()

        res.status(200).render('cart', { products: cart.productCarts, cartId: '657901d1973ef35614b9b24f' })
    } catch (error) {

    }




})