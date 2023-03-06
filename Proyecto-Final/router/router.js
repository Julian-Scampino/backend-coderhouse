import { Router } from "express";
import {
    autenticacionLogin,
    autenticacionRegister,
    checkAuthentication,
} from "./middlware/middlware-autenticacion.js";
import {
    getRoot,
    getLogin,
    errorLogin,
    postLogin,
    getRegister,
    errorRegister,
    getLogout,
    getHome,
    getOrdenes,
    getInfo,
} from "./controlador/controlador.router.js";

const routers = new Router();

//-------- ROOT
routers.get("/", getRoot);
//-------- HOME
routers.get("/home", checkAuthentication, getHome);
//-------- LOGIN
routers.get("/login", getLogin);
routers.post("/login", autenticacionLogin(), postLogin);
routers.get("/error-login", errorLogin);
//-------- REGISTER
routers.get("/register", getRegister);
routers.post("/register", autenticacionRegister(), (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    return res.redirect("/login");
});
routers.get("/error-register", errorRegister);
//-------- LOGOUT
routers.get("/logout", getLogout);
//-------- Informacion del sistema
routers.get("/info", getInfo);
//-------- Ordenes
routers.get("/ordenes", checkAuthentication, getOrdenes);

export default routers;
