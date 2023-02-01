import mongoose from "mongoose";
const productoSchema = new mongoose.Schema({
    nombre: String,
    description: String,
    url: String,
    precio: Number,
    stock: Number
}, { timestamps: true })
const ProductoModel = mongoose.model('producto', productoSchema)
export default ProductoModel