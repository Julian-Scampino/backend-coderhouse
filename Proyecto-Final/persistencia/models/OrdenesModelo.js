import mongoose from "mongoose";
const ordenesSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        estado: { type: String, default: "generada" },
        productos: { type: Array, required: true },
        numero: { type: Number, required: true },
    },
    { timestamps: true }
);
const OrdenesModel = mongoose.model("ordenes", ordenesSchema);
export default OrdenesModel;
