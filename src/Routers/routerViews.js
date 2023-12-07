import  path  from 'path'
import __dirname from '../utils.js'
import { Router} from 'express'
import { ProductsMongo } from '../dao/managerProductsMongo.js'
export const router = Router()
import { io } from '../app.js'

let pm = new ProductsMongo()
let products = pm.getProduct()


router.get('/',(req,res)=>{

res.status(200).render("home",{titulo:"home page",products})

})

router.get("/chat", (req, res) => {

    res.status(200).render('chat')

})


router.get('/realtimeproducts',(req,res)=>{

    res.status(200).render('websocket',{products,titulo:"Web socket"})
    
    })