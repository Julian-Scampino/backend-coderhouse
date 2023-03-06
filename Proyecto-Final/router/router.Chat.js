import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { getChatUser } from "./controlador/controlador.router.chat.js";

const routerChat = express.Router();

routerChat.get("/:email", getChatUser);

export default routerChat;
