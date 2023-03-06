import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        role: { type: String, default: "usuario" },
        mensaje: { type: String, required: true },
    },
    { timestamps: true }
);
const ChatModel = mongoose.model("chats", chatSchema);
export default ChatModel;
