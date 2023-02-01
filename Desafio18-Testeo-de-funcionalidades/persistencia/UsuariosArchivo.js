import bCrypt from "bcrypt"
import fs from "fs"
import * as dotenv from 'dotenv'
dotenv.config()


export default class UsuariosArchivo {
    constructor() {
        this.arrayUsuarios = []
        this.url = './persistencia/usuarios.txt'
        this._id = 0
	}
    createHash(password) {
        return  bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
    isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
    async buscarUsuarioID(_id){
        try{
            const todos = await this.buscarTodosUsuarios();
			if(todos.length > 0){
				let producto = todos.find((user) => user._id == _id);
				return producto
			}else{
				return { error: "no hay usuarios registrados" }	
			}
        }catch(err){
            return err

        }
    }
    async buscarUsuarioUsername(name){
        try{
            const todos = await this.buscarTodosUsuarios();
			if(todos.length > 0){
				let usuarioFind = todos.find((user) => user.username == name);
				return usuarioFind
			}else{
                let vacio = []
				return vacio	
			}
        }catch(err){
            return err

        }
    }
    async buscarTodosUsuarios(){
        try{
            const todos = await fs.promises.readFile(this.url,"utf-8")
			return todos.length
			? JSON.parse(todos,null,2)
			: [];
        }catch(err){

        }
    }
	async registrarUsuario(req, username, password, done) {
        let passwordEncriptado = this.createHash(password)
        try{
            const nuevoUsuario = {username,password: passwordEncriptado,email: req.body.email}
			let todos = (await this.buscarTodosUsuarios()) || []
            /* if (typeof(todos) == 'undefined') {
                todos = []
            } */
            console.log("todos archivo", todos);
            if (Array.isArray(todos) && todos.length <= 0) {
                nuevoUsuario._id = 1;
            }else if (!(todos.some((usuario) => usuario.username == nuevoUsuario.username))) {
                const id = todos.sort((a, b) => b._id - a._id)[0]._id;
                nuevoUsuario._id = id + 1;
            }else if(todos.some((usuario) => usuario.username == nuevoUsuario.username)){
                return done(null, false)
            }
			todos.push(nuevoUsuario)
			await fs.promises.writeFile(this.url, JSON.stringify(todos, null, 2),"utf-8")
            return done(null, nuevoUsuario);
        }
        catch (error){
            return done(error, null);
        }
	}
    async loginUsuario(username, password, done){
        try{
            let persona = await this.buscarUsuarioUsername(username)
            console.log("log luego de buscar en archivo buscarUsuarioUsername");
            if (!persona){
                return done(null, false)
            }
            if(!this.isValidPassword(persona, password)){
                return done(null, false)
            }
            return done(null, persona)
		} catch (e) {
            console.log("error login de clase de archivo");
			return done(e, null);
		}
    }
    static returnSingleton(){
        if(!this.instance){
            this.instance = new UsuariosArchivo()
        }
        return this.instance
    }
    
}
