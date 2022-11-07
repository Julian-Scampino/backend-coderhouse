let tbody = document.querySelector("tbody")
	tbody.innerHTML = ""
	array.forEach((element) =>{
		tbody.innerHTML += `<tr>
		<td>${element.objeto}</td>
	</tr>`
    })