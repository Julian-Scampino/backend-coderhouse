import mongoose from "mongoose";
const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number
}, { timestamps: true })
const ProductoModel = mongoose.model('producto', productoSchema)
export default ProductoModel