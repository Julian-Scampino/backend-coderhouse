import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "usuario" },
});

export default model("Usuarios", UsuariosSchema);
