class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    } 
    addMascota(String){
        this.mascotas.push(String)
        console.log(this.mascotas)
    } 
    countMascotas(){
        console.log(this.mascotas.length)
    } 
    addBook(nuevoLibro, nuevoAutor){
        this.libros.push({nombre: nuevoLibro, autor: nuevoAutor})
        console.log(this.libros)
    }
    getBookNames(){
        console.log(this.libros.map((e)=> e.nombre))
    }
}

const usuario1 = new Usuario("Juan", "Perez", [{nombre: "Historia Argentina 1", autor: "Gabriel Fernandez"}], ["Perro", "Gato"])

usuario1.getFullName()
usuario1.addMascota("Pájaro")
usuario1.countMascotas()
usuario1.addBook("Matemática 1", "Daniela Aguirre")
usuario1.getBookNames()