const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const server = app.listen(PORT, () => {
	console.log("servidor levantado");
});
server.on("error", (error) => console.log(`hubo un error ${error}`));
app.use("/", express.static("public"));

const productos = [];

app.post("/productos", (req, res) => {
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
app.set("view engine", "ejs");
app.get("/productos", (req, res) => {
    res.render("index", {productos});
});
