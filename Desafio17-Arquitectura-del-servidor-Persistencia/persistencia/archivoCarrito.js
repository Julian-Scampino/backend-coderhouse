import fs from "fs"


async function leerCarrito(){
	try{
		const todos = await fs.promises.readFile("./persistencia/carrito.txt","utf-8")
		return todos.length
			? JSON.parse(todos,null,2)
			: { error: "no hay nada en archivo" }
	}
	catch(error){
		console.log("error al leer archivo de carrito");
		console.log(error);
	}
}
async function escribirCarrito(mensaje){
    try{
        await fs.promises.writeFile("./carrito.txt", JSON.stringify(mensaje, null, 2),"utf-8")
    }
    catch(error){
        console.log(error);
    }
}

export {leerCarrito, escribirCarrito}