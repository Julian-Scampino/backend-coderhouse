import path from 'path'
import pino from "pino"
import {lecturaCarrito, escrituraCarrito} from '../servicio/logica.js'
import * as dotenv from 'dotenv'
dotenv.config()
const loggerError = pino('error.log')
const loggerWarning = pino('warning.log')
const loggerInfo = pino()

loggerError.level = 'error'
loggerWarning.level = 'warn'
loggerInfo.level = 'info'


const getRoot = (req, res) => {
    res.redirect('/home')
}

//-------- LOGIN
const getLogin = (req, res) => {
    console.log("log de getLogin, req.user?.username", req.user?.username);
    console.log("log de getLogin, req.isAuthenticated()", req.isAuthenticated());
    const nombre = req.user?.username
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), "/public/login.html"))
    }
}
const errorLogin = (req, res) => {
    loggerError.error('error al autenticar')
    loggerInfo.error('error al autenticar')
    res.sendFile(path.join(process.cwd(), "/public/error-login.html"))
}
//-------- REGISTER
const getRegister = (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/register.html"))
}

const errorRegister = (req, res) => {
    loggerError.error('error al registrar')
    loggerInfo.error('error al registrar')
    res.sendFile(path.join(process.cwd(), "/public/error-register.html"))
}
//-------- LOGOUT
const getLogout = (req, res) => {
    console.log("log de getLogout, al principio",req.isAuthenticated());
    req.logout(function(err) {
        if (err) { return next(err); }
        res.render(path.join(process.cwd(), '/views/logout.ejs'))
    });
    console.log("log de getLogout, al final",req.isAuthenticated());
}
//-------- HOME
const getHome = (req, res) => {
    res.render(path.join(process.cwd(), '/views/home.ejs'), { nombre: req.user.username })
}

//-------  Productos
const getProductos = async (req, res) => {
        const productosArray = [{id:1, titulo:"lapiz", precio: 12},{id:2, titulo:"carpeta", precio: 24}]
        res.render(path.join(process.cwd(), '/views/productos.ejs'), { nombre: req.user.username, productos: productosArray, carrito: await lecturaCarrito() })
}
//-------  RESUMEN
const getResumen = async (req, res) => {
    let carrito = await lecturaCarrito()
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
    res.render(path.join(process.cwd(), '/views/resumen.ejs'), { usuario: {nombre: req.user.username, email: req.user.email},  productos: carrito })
}

export {getRoot, getLogin, errorLogin, getRegister, errorRegister, getLogout, getHome,
        getProductos, getResumen}