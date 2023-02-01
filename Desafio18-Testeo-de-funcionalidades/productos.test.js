import {expect} from 'chai'
import axios from "axios"
import { strictEqual, deepStrictEqual, notStrictEqual, equal } from "assert";

describe("test de requests de /productos", ()=> {
    before( async ()=> {
        await axios.delete("http://localhost:8080/productos?admin=true")
    });
    const getTodos = async () =>{
        return await axios.get("http://localhost:8080/productos")
    }
    it("GET de todos en el inicio, deberia estar vacio y ser de length 0", async ()=>{
        let productos = await getTodos()
        //console.log("log de productos", productos.data.length)
        equal(productos.data.length, 0)

    });
    it("POST de 1 producto, deberia agregar 1 y tener las propiedades correspondientes", async ()=>{
        let productoParaAgregar = {nombre: "cosaTest1", precio: 123}
        let productoAgregado = await axios.post("http://localhost:8080/productos?admin=true", productoParaAgregar)
        //console.log("log de POST con id", producto.data)
        expect(productoAgregado.data).to.include.keys("nombre", "precio", "id")

    });
    it("POST de 1 productos mas, deberia haber 2 productos en total", async ()=>{
        let productoParaAgregar = {nombre: "cosaTest2", precio: 234}
        await axios.post("http://localhost:8080/productos?admin=true", productoParaAgregar)
        let productosTodos = await getTodos()
        //console.log("log de todos para el segundo POST", productosTodos.data)
        equal(productosTodos.data.length, 2)

    });
    it("PUT de 1 producto, deberia actualizar un valor pre-existente de una propiedad", async ()=>{
        let productoParaActualizar = {nombre: "cosaTestUno", precio: 234}
        let productoActualizado= await axios.put("http://localhost:8080/productos/1?admin=true", productoParaActualizar)
        //console.log("log de todos para el segundo POST", productosTodos.data)
        deepStrictEqual(productoActualizado.data.nombre, productoParaActualizar.nombre)

    });
    it("DELETE de 1, deberia borrar el especificado", async ()=>{
        let todos = await getTodos()
        let algunId = todos.data[0].id
        let productoBorrado= await axios.delete(`http://localhost:8080/productos/${algunId}?admin=true`)
        equal(productoBorrado.data.id, algunId)
    });
    it("DELETE de TODOS, deberia borrar todo y ser de length 0", async ()=>{
        await axios.delete(`http://localhost:8080/productos?admin=true`)
        let todos = await getTodos()
        equal(todos.data.length, 0)
    });
    

})