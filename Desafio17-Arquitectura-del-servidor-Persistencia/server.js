import express  from "express"
import {Server as HttpServer} from "http"
import {Server as IOServer} from "socket.io"
import fs from "fs"
import pino from "pino"
const loggerError = pino('error.log')
const loggerWarning = pino('warning.log')
const loggerInfo = pino()

loggerError.level = 'error'
loggerWarning.level = 'warn'
loggerInfo.level = 'info'
import {normalizar} from "./esquemaNormaizr.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import routers from "./router/router.js"
import * as dotenv from 'dotenv'
dotenv.config()
import {passport} from './config/configPassport.js'
import routerDesafioNuevo from './router/routerDesafioNuevo.js'


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(session({
	secret: 'shhhhh',
	cookie: {
	  httpOnly: false,
	  secure: false,
	  maxAge: 600000
	},
	rolling: true,
	resave: true,
	saveUninitialized: false
}));
   

//middlewares passport
app.use(passport.initialize());
app.use(passport.session());

app.use(routers)
app.use("/api", routerDesafioNuevo)

// Logger PINO para todas las rutas existentes
app.use((req, res, next)=>{
	loggerInfo.info(`Peticion en Ruta: ${req.url}, metodo ${req.method} `)
	next()
})
// Logger PINO para todas las rutas inexistentes
app.use('*', (req, res)=>{
	loggerWarning.warn('la ruta no existe')
	loggerInfo.warn('la ruta no existe')
	res.send("la ruta no existe")
})



const carrito = []

async function escribirCarrito(mensaje){
    try{
        await fs.promises.writeFile("./persistencia/carrito.txt", JSON.stringify(mensaje, null, 2),"utf-8")
    }
    catch(error){
        console.log(error);
    }
}
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
	socket.on('carrito', (data) =>{
		console.log(data);
        carrito.push(data)
        escribirCarrito(carrito)
    })
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
// EL SIGUIENTE CODIGO COMENTADO ES DEL DESAFIO USANDO EL OBJETO PROCESS
// CLASES 27 Y 28, TIENE QUE VER CON EL PUERTO
/* let optionsProcess = {default: {puerto: 8080}} */
/* const PORT = parseArgs(process.argv, optionsProcess).puerto */
const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, () => {
	console.log("servidor levantado en puerto " + PORT);
});