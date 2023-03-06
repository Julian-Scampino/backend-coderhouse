import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import routers from "./router/router.js";
import * as dotenv from "dotenv";
dotenv.config();
import { passport } from "./config/configPassport.js";
import routerProductos from "./router/router.Producto.js";
import routerCarrito from "./router/router.Carrito.js";
import routerChat from "./router/router.Chat.js";
import Chat from "./persistencia/Chat/ChatFactory.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.set("socketio", io);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// pasport da error si quito las sessions
app.use(cookieParser());
app.use(
    session({
        secret: "shhhhh",
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 111111111,
        },
        rolling: true,
        resave: true,
        saveUninitialized: false,
    })
);

//middlewares passport, pasport da error si quito las sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(routers);
app.use("/product", routerProductos);
app.use("/carritos", routerCarrito);
app.use("/chat", routerChat);

app.use("*", (req, res) => {
    res.send("la ruta no existe");
});

let chat = new Chat().returnDbConnection();

io.on("connection", async (socket) => {
    socket.emit("mensajes", await chat.listarAll());
    socket.on("mensaje", async (data) => {
        await chat.guardar(data);
        io.sockets.emit("mensajes", await chat.listarAll());
    });
});
const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log("servidor levantado en puerto " + PORT);
});
