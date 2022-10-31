export default class Producto {
	static productos = [];
	constructor() {
		this.id = 0 ;
	}
	async listar(id) {
		try{
			if(Producto.productos.length > 0){
				let producto = Producto.productos.find((prod) => prod.id == id);
				return producto
			}else{
				return { error: "no hay productos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async listarAll() {
		try{
			return Producto.productos.length
			? Producto.productos
			: { error: "no hay productos cargados" };
        }
        catch (error){
            console.log(error)
        }
	}

	async guardar(prod) {
		try{
            if (Producto.productos.length <= 0 || Producto.productos == undefined) {
                prod.id = 1;
            }else if (!(Producto.productos.some((producto) => producto.id == prod.id))) {
                const id = Producto.productos.sort((a, b) => b.id - a.id)[0].id;
                prod.id = id + 1;
            }
			prod.timeStamp = Date.now()
			Producto.productos.push(prod)
            return prod;
        }
        catch (error){
            console.log(error)
        }
	}
	async actualizar(prod, id) {
		try{
			if(Producto.productos.length > 0){
				prod.id = Number(id);
				prod.timeStamp = Date.now()
				let index = Producto.productos.findIndex((prod) => prod.id == id);
				Producto.productos.splice(index, 1, prod);
				return Producto.productos[index]
			}else{
				return { error: "no hay productos cargados para actualizar" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async borrar(id) {
		try{
			if(Producto.productos.length > 0){
				let index = Producto.productos.findIndex((prod) => prod.id == id);
				let productoBorrado = Producto.productos.splice(index, 1)
				return productoBorrado;
			}else{
				return { error: "no hay productos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
}
