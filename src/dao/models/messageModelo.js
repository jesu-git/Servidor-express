import mongoose from "mongoose";
import { Schema } from "mongoose";

export const messageModelo =  mongoose.model('mesaage', new Schema({
     
    nombre:{ type: String, require:true},
    id:{type: Number,require:true}
    
},{
    timestamps:true
}))