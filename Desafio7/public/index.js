const socket = io.connect();

const input = document.querySelector("input");

// PARA LOS PRODUCTOS
document.getElementById("formProductos").addEventListener("submit",(e) =>{
	e.preventDefault()
	let producto = {titulo: e.target[0].value, precio: e.target[1].value, url: e.target[2].value}
	socket.emit("producto", producto);
})
socket.on("productos", (data) => {
	let tbody = document.querySelector("tbody")
	tbody.innerHTML = ""
	data.forEach((element) =>{
		tbody.innerHTML += `<tr>
		<td>${element.titulo}</td>
		<td>${element.precio}</td>
		<td>${element.url}</td>
	</tr>`
	})
});

// PARA LOS MENSAJES
document.getElementById("formChat").addEventListener("submit",(e) =>{
	e.preventDefault()
	let mensaje = {Email: e.target[0].value, Fecha: new Date().toLocaleString(), Mensaje: e.target[1].value}
	socket.emit("mensaje", mensaje);
})

socket.on("mensajes", (data) => {
	const mensajes = data
		.map(
			(msj) =>`Email: <strong style="color:blue; font-weight: bold">${msj.Email}</strong> 
					-> Fecha: <strong style="color: brown">${msj.Fecha}</strong>
					-> Mensaje: <strong style="color: green; font-style: italic">${msj.Mensaje}</strong>
    				`
		)
		.join("<br>");
	document.querySelector("p").innerHTML = mensajes;
});