const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
	console.log("servidor levantado");
});

app.use("/archivos", express.static("public"));

const productos = [];

const routerProductos = express.Router();

routerProductos.get("/", (req, res) => {
	res.json({ productos });
    res.end()
});
routerProductos.get("/:id", (req, res) => {
	let id = req.params.id
    let indiceProducto = productos.findIndex((busqueda) => busqueda.id == id)
    if(indiceProducto >=0){
        let busqueda = productos[indiceProducto]
        res.json({busqueda})
        res.end()
    }
    res.json({mensaje: "ERROR ese producto no existe"})
    res.end()
});

routerProductos.post("/", (req, res) => {
    if(productos.length <= 0) {
        req.body.id = 1;
        productos.push(req.body);
        res.json(req.body);
        res.end()
    }else if((productos.find((producto) => producto.titulo == req.body.titulo)) == undefined) {
        const id = productos.sort((a, b) => b.id - a.id)[0].id;
        req.body.id = id + 1;
        productos.push(req.body);
        res.json(req.body);
        res.end()
    }
    res.json({mensaje: "ERROR ese producto ya existe"})
    res.end()
});
routerProductos.put("/:id", (req, res)=>{
    let id = req.params.id
    let body = req.body
    let indiceProducto = productos.findIndex((busqueda) => busqueda.id == id)
    if(indiceProducto >=0){
        let actualizacion = {id: id, ...body}
        productos[indiceProducto] = actualizacion
        res.json({mensaje: "producto actualizado"})
        res.end()
    }
    res.json({mensaje: "ERROR ese producto no existe"})
    res.end()
})
routerProductos.delete("/:id", (req, res)=>{
    let id = req.params.id
    let indiceProducto = productos.findIndex((busqueda) => busqueda.id == id)
    if(indiceProducto >=0){
        productos.splice(indiceProducto, 1)
        res.json({mensaje: "producto actualizado"})
        res.end()
    }
    res.json({mensaje: "ERROR ese producto no existe"})
    res.end()
})
app.use("/api/productos", routerProductos);