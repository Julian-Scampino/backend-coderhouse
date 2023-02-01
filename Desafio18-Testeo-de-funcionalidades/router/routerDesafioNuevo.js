import { Router } from 'express'
import {getInfo, getRandoms} from '../controlador/controlador.router.OtroDesafio.js'

///------------- DE ESTE DESAFIO NUEVO ------------- ///
const routerDesafioNuevo = new Router()

routerDesafioNuevo.get("/info", getInfo )
routerDesafioNuevo.get("/randoms", getRandoms )

export default routerDesafioNuevo