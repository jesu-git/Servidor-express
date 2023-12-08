import mongoose from 'mongoose'


const collectionCarts = 'carts'
const schemaCarts = new mongoose.Schema({


    id: { type: 'number', unique: true },
    productsCarts: [{
        productId: Number,
        quantity: Number
    }]
}, {
    timestamps: true
})


export const CartModelo = mongoose.model(collectionCarts, schemaCarts)