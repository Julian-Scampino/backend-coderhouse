import { Router } from 'express'
import path from 'path'
import passport from 'passport'
import {Server as IOServer} from "socket.io"
import fs from "fs"
import pino from "pino"
import { captureRejectionSymbol } from 'events'
import { createTransport } from 'nodemailer';
const loggerError = pino('error.log')
const loggerWarning = pino('warning.log')
const loggerInfo = pino()

loggerError.level = 'error'
loggerWarning.level = 'warn'
loggerInfo.level = 'info'


const routers = new Router()

routers.get('/', (req, res) => {
    res.redirect('/home')
})
//-------- LOGIN
routers.get('/login', (req, res) => {
    const nombre = req.user?.username
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), "/public/login.html"))
    }
})
routers.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: "/error-login",
    })
);
routers.get("/error-login", (req, res) => {
    loggerError.error('error al autenticar')
    loggerInfo.error('error al autenticar')
    res.sendFile(path.join(process.cwd(), "/public/error-login.html"))
});
//-------- REGISTER
routers.get("/register", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/register.html"))
});
routers.post(
	"/register",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/error-register",
	})
);
routers.get("/error-register", (req, res) => {
    loggerError.error('error al registrar')
    loggerInfo.error('error al registrar')
    res.sendFile(path.join(process.cwd(), "/public/error-register.html"))
});
//-------- LOGOUT
routers.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.render(path.join(process.cwd(), '/views/logout.ejs'))
      });
})
//-------- HOME
routers.get('/home', checkAuthentication, (req, res) => {
    res.render(path.join(process.cwd(), '/views/home.ejs'), { nombre: req.user.username })
})
function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}
//-------  Productos
routers.get('/productos', checkAuthentication, async (req, res) => {
    const productosArray = [{id:1, titulo:"lapiz", precio: 12},{id:2, titulo:"carpeta", precio: 24}]
    res.render(path.join(process.cwd(), '/views/productos.ejs'), { nombre: req.user.username, productos: productosArray, carrito: await leerCarrito() })
})
//-------  resumen
async function leerCarrito(){
	try{
		const todos = await fs.promises.readFile("carrito.txt","utf-8")
		return todos.length
			? JSON.parse(todos,null,2)
			: { error: "no hay nada en archivo" }
	}
	catch(error){
		console.log(error);
	}
}
routers.get('/resumen', checkAuthentication, async (req, res) => {
    let carrito = await leerCarrito()
    console.log("carrito en log", carrito);
    let textoCarrito = ""
    carrito.forEach((element) => {
        textoCarrito +=
        `<p>
            <p>  ${element.id}  </p>
            <p>  ${element.titulo}  </p>
            <p>  ${element.precio}  </p>
        </p><br>`
        })
    process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAILADMIN,
            pass: process.env.PASSWORDEMAILADMIN
        }
    });
    const mailOptions = {
        from: 'Servidor Node.js',
        to: process.env.EMAILADMIN,
        subject: `Nueva compra ${req.user.username}`,
        html: `<h1 style="color: blue;">Resumen de compra de usuario ${req.user.username} con email ${req.user.email}</h1><br>` + 
            `<h2>Resumen de Compra</h2>` + `<p>Id - titulo - precio</p><br>` + textoCarrito
            
    }
    try {
        const info = await transporter.sendMail(mailOptions) 
        console.log(info)
    } catch (error) {
        console.log(error)
    }; 

    res.render(path.join(process.cwd(), '/views/resumen.ejs'), { usuario: {nombre: req.user.username, email: req.user.email},  productos: carrito })
})

export default routers