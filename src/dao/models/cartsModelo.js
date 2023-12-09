import mongoose, { Schema } from 'mongoose'


const collectionCarts = 'carts'
const schemaCarts = new mongoose.Schema({


    id: { type: 'number', unique: true },
    productCarts: {
        type: [{
            productId: {type: Number},
            quantity: { type: Number }
        }]
    }
}, {
    timestamps: true
})

schemaCarts.pre('find',function(){ this.populate('productCarts.productId')})
export const CartModelo = mongoose.model(collectionCarts, schemaCarts)