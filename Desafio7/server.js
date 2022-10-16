const express = require("express");
const {configMysql} = require("./configMariaDB")
const knexMysql = require('knex')(configMysql)
const {configSqlite3} = require("./configSqlite3")
const knexSqlite3 = require('knex')(configSqlite3)


const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

const productos = []
const mensajes = [];

class BasesDeDatos{
	constructor(configuracion, nombreDeTabla){
		this.configuracion = configuracion
		this.nombreDeTabla = nombreDeTabla
	}
	guardarMysql(producto){
		knexMysql(this.nombreDeTabla).insert(producto)
		.then(()=> console.log("producto insertado"))
		.catch((err)=>console.log(err))
	}
	guardarSqlite3(chat){
		knexSqlite3(this.nombreDeTabla).insert(chat)
		.then(()=> console.log("chat insertado"))
		.catch((err)=>console.log(err))
	}
}

io.on("connection", (socket) => {
	console.log("se conecto un usuario");

	socket.emit("productos", productos)
	socket.emit("mensajes", mensajes);

	socket.on('producto', (data) =>{
		productos.push(data)
		let desafio = new BasesDeDatos(configMysql, "productos")
		desafio.guardarMysql(data)
		io.sockets.emit("productos", productos)
	})

	socket.on("mensaje", (data) => {
		mensajes.push(data)
		let desafio = new BasesDeDatos(configSqlite3, "chat")
		desafio.guardarSqlite3(data)
		io.sockets.emit("mensajes", mensajes);
	});
});
const connectedServer = httpServer.listen(3001, () => {
	console.log("servidor levantado");
});