const express = require("express");
const fs = require("fs")

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

const productos = []
const mensajes = [];

async function escribir(mensaje){
	try{
		await fs.promises.writeFile("./chat.txt", JSON.stringify(mensaje, null, 2),"utf-8")
	}
	catch(error){
		console.log(error);
	}
}

io.on("connection", (socket) => {
	console.log("se conecto un usuario");

	socket.emit("productos", productos)
	socket.emit("mensajes", mensajes);

	socket.on('producto', (data) =>{
		productos.push(data)
		io.sockets.emit("productos", productos)
	})

	socket.on("mensaje", (data) => {
		mensajes.push(data);
		escribir(mensajes)
		io.sockets.emit("mensajes", mensajes);
	});
});
const connectedServer = httpServer.listen(3001, () => {
	console.log("servidor levantado");
});