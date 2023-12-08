import mongoose from 'mongoose';

export const productModelo = mongoose.model('productos', new mongoose.Schema({

title: { type: String, required: true },

description: { type: String, required: true },

code: { type: String, required: true, unique: true },

price: { type: Number, required: true },

status: { type: Boolean, required: true },

stock: { type: Number, required: true },

category: { type: String, required: true },

id: { type: Number, unique: true },

thumbnails: [String]

}, {

timestamps: true

}));