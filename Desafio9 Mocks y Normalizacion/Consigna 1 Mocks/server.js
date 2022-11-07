import express  from "express"
import {Server as HttpServer} from "http"
import ejs from "ejs"
import {faker} from "@faker-js/faker"

faker.locale = "es"

const app = express();
const httpServer = new HttpServer(app);

app.set("view engine", "ejs");

const routerProductos = express.Router();

routerProductos.get("/productos-test", (req, res) => {
    let productos = []
    for(let i = 1; i<6; i++ ){
        let producto = {
            titulo: faker.commerce.product(),
            precio: faker.commerce.price(1, 1000, 0),
            url: faker.image.imageUrl()
        }
        productos.push(producto)
    }
    res.render("productos-test", {productos})
    res.end()
});

app.use("/api/", routerProductos);
const connectedServer = httpServer.listen(8080, () => {
	console.log("servidor levantado");
});
