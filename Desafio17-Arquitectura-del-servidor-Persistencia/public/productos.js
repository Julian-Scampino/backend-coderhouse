const socket = io.connect();

let botonesCompra = Array.from(document.getElementsByClassName("botonAgregarProducto"))
botonesCompra.forEach((element) =>{
    element.addEventListener('click', (e) =>{
        const productosArrayFront = [{id:1, titulo:"lapiz", precio: 12},{id:2, titulo:"carpeta", precio: 24}]
        let productoIndex = e.target.id - 1
        console.log(productosArrayFront[productoIndex]);
        socket.emit('carrito', productosArrayFront[productoIndex] )
    })
})
