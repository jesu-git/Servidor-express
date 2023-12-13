import  path  from 'path'
import __dirname from '../utils.js'
import { Router} from 'express'
import { productModelo } from '../dao/models/productModelo.js'
import { ProductsMongo } from '../dao/managerProductsMongo.js'
export const router = Router()
import { io } from '../app.js'
import mongoose from 'mongoose'

let mongo = new ProductsMongo()

router.get('/',(req,res)=>{

res.status(200).render("home",{titulo:"home page",products})

})

router.get("/chat", (req, res) => {

    res.status(200).render('chat')

})


router.get('/realtimeproducts',async (req,res)=>{

    let products = await mongo.getProduct()
    console.log(products)

    res.status(200).render('websocket',{ products ,titulo:"Web socket"})
    
    })