import mongoose from "mongoose";
const productoSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },
        description: { type: String, required: true },
        url: { type: String, required: true },
        precio: { type: Number, required: true },
        categoria: { type: String, required: true },
    },
    { timestamps: true }
);
const ProductoModel = mongoose.model("producto", productoSchema);
export default ProductoModel;
