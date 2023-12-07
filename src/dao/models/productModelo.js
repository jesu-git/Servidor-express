import mongoose from 'mongoose'

export const productModelo = mongoose.model('productos',new mongoose.Schema({

    title: {type:'string',requiered: true},
    description:{type:'string',requiered: true},
    code: {type:'string',requiered: true , unique: true },
    price: {type:'number',requiered: true},
    status: {type:'boolean',requiered: true},
    stock: {type:'number',requiered: true},
    category: {type:'string',requiered: true},
    id:{type:'number',unique: true},
    thumbnails:'array'
},{
    timestamps:true
}))