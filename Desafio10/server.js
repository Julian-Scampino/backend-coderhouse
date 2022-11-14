import express  from "express"
import {Server as HttpServer} from "http"
import {Server as IOServer} from "socket.io"
import fs from "fs"
import {normalizar} from "./esquemaNormaizr.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import routers from "./router/router.js"
import * as dotenv from 'dotenv'
dotenv.config()


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(cookieParser())
app.use(session({
	store: MongoStore.create({
		mongoUrl: `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`,
		mongoOptions: advancedOptions
	}),
	secret: "shhhhh",
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 60000}
}))
app.use(routers)

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
		let normalizado = normalizar(mensajes)
		await escribir(normalizado)
		let lecturaDeMensajes = await leer()
		io.sockets.emit("mensajes", lecturaDeMensajes);
	});
});
const connectedServer = httpServer.listen(3001, () => {
	console.log("servidor levantado en puerto 3001");
});