import { Router } from 'express'
import {autenticacionLogin, autenticacionRegister, checkAuthentication} from './middlware/middlware-autenticacion.js'
import {getRoot, getLogin, errorLogin, getRegister, errorRegister, getLogout, getHome,
    getProductos, getResumen } from '../controlador/controlador.router.js'

const routers = new Router()

routers.get('/', getRoot)
//-------- LOGIN
routers.get('/login', getLogin)

routers.post("/login", autenticacionLogin());
routers.get("/error-login", errorLogin);
//-------- REGISTER
routers.get("/register", getRegister);
routers.post("/register", autenticacionRegister());
routers.get("/error-register", errorRegister);
//-------- LOGOUT
routers.get('/logout', getLogout)
//-------- HOME
routers.get('/home', checkAuthentication, getHome)

//-------  Productos
routers.get('/productos', checkAuthentication, getProductos)
//-------  RESUMEN
routers.get('/resumen', checkAuthentication, getResumen)



export default routers