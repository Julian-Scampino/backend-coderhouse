import express  from "express"
import {Server as HttpServer} from "http"
import {Server as IOServer} from "socket.io"
import fs from "fs"
import {normalizar} from "./esquemaNormaizr.js"

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));


const mensajes = [];

async function escribir(mensaje){
	try{
		await fs.promises.writeFile("./chat.txt", JSON.stringify(mensaje, null, 2),"utf-8")
	}
	catch(error){
		console.log(error);
	}
}
async function leer(){
	try{
		const todos = await fs.promises.readFile("./chat.txt","utf-8")
		return todos.length
			? JSON.parse(todos,null,2)
			: { error: "no hay nada en archivo" }
	}
	catch(error){
		console.log(error);
	}
}

io.on("connection", (socket) => {
	console.log("se conecto un usuario");
	// --- El emit de abajo no lee la base de datos al conectarse la primera vez
	//--- Si recibe los mensajes, luego de conectarse, cuando son emitidos por alguien
	socket.emit("mensajes", (async () => {
			await leer()
		})());
	
	socket.on("mensaje",  async (data) => {
		if (mensajes.length <= 0) {
			data.id = 1
		} else {
			const id = mensajes.sort((a, b) => b.id - a.id)[0].id;
            data.id = id + 1;	
		}
		mensajes.push(data);
		console.log(mensajes);
		let normalizado = normalizar(mensajes)
		await escribir(normalizado)
		let lecturaDeMensajes = await leer()
		io.sockets.emit("mensajes", lecturaDeMensajes);
	});
});
const connectedServer = httpServer.listen(3001, () => {
	console.log("servidor levantado");
});