import mongoose from 'mongoose'


const collectionCarts = 'carts'
const schemaCarts = new mongoose.Schema({


    id:{type:'number',unique: true},
    productsCarts:{type:'array'}
},{
    timestamps:true
})


export const CartModelo = mongoose.model(collectionCarts,schemaCarts)