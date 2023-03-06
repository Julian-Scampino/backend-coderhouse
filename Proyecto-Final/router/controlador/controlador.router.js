import path from "path";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import parseArgs from "minimist";
import Carrito from "../../persistencia/Carrito/CarritoFactory.js";
import Ordenes from "../../persistencia/Ordenes/OrdenesFactory.js";
import { createTransport } from "nodemailer";

//-------- ROOT
const getRoot = (req, res) => {
    res.redirect("/home");
};
//-------- HOME
const getHome = (req, res) => {
    if (req.user?.email) {
        res.redirect("/product");
    } else {
        res.redirect("/login");
    }
};

//-------- LOGIN
const getLogin = (req, res) => {
    const nombre = req.user?.email;
    if (nombre) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(process.cwd(), "/public/login.html"));
    }
};
const errorLogin = (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/error-login.html"));
};
const postLogin = (req, res) => {
    const payload = {
        email: req.body.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SIGN, { expiresIn: "24h" });
    res.json({ token });
};
//-------- REGISTER
const getRegister = (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/register.html"));
};

const errorRegister = (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/error-register.html"));
};

//-------- LOGOUT
const getLogout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.render(path.join(process.cwd(), "/views/logout.ejs"));
    });
};

let carrito = new Carrito().returnDbConnection();
let ordenes = new Ordenes().returnDbConnection();
//-------  Ordenes
const getOrdenes = async (req, res) => {
    let carritoUser = await carrito.listarEmail(req.user.email);
    //--- Si no hay un carrito creado cn el mail  viene un error de la base de datos
    if (carritoUser.error) {
        return res.send(carritoUser);
    }
    if (carritoUser.productos <= 0) {
        return res.send({ error: "error el carrito esta vacio" });
    }
    if (!req.query.email) {
        return res.send({
            error: "error falta tu email de query params o parametro incorrecto",
        });
    }
    // VOY A USAR QUERY PARAMS PARA EL EMAIL de envio de orden
    let ordenNueva = await ordenes.crearOrdenes({
        email: req.user.email,
        productos: carritoUser.productos,
    });
    let textoCarrito = "";
    carritoUser.productos.forEach((element) => {
        textoCarrito += `<p>
            <p>  ${element._id}  </p>
            <p>  ${element.titulo}  </p>
            <p>  ${element.precio}  </p>
        </p><br>`;
    });
    // Sin esto me da un error
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAILADMIN,
            pass: process.env.PASSWORDEMAILADMIN,
        },
    });
    const mailOptions = {
        from: "Servidor Node.js",
        to: req.query.email,
        subject: `Nueva compra ${req.user.username}`,
        html:
            `<h1 style="color: blue">Resumen de compra de usuario ${req.user.username} con email ${req.user.email}</h1><br>` +
            `<h2>Numero de orden: ${ordenNueva.numero}</h2>` +
            `<h2>Resumen de Compra</h2>` +
            `<p>Id - titulo - precio</p><br>` +
            textoCarrito,
    };
    try {
        await transporter.sendMail(mailOptions);
        return res.render(path.join(process.cwd(), "/views/ordenes.ejs"), {
            usuario: { nombre: req.user.username, email: req.user.email },
            productos: carritoUser.productos,
        });
    } catch (error) {
        return res.send(error);
    }
};

///------------- DEL DESAFIO USANDO EL OBJETO PROCESS, clases 27 y 28 ------------- ///
const getInfo = (req, res) => {
    res.render(path.join(process.cwd(), "/views/info.ejs"), {
        argv: JSON.stringify(parseArgs(process.argv.slice(2))),
        path: process.argv[1],
        sistema: process.platform,
        processId: process.pid,
        version: process.version,
        carpeta: process.cwd(),
        memoria: process.memoryUsage().rss,
    });
};

export {
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
};
