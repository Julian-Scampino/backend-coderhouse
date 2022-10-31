import mongoose from "mongoose";
const carritoSchema = new mongoose.Schema({
    productos : Array,
}, { timestamps: true })
const CarritoModel = mongoose.model('carrito', carritoSchema)
export default CarritoModel