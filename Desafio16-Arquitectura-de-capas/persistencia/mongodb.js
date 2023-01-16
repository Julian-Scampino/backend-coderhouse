import mongoose from "mongoose";
import UserModels from './models/userModels.js'
import bCrypt from "bcrypt"
import * as dotenv from 'dotenv'
dotenv.config()


export default class ClassMongoPassport {
    static productos = [];
	constructor() {
        this.url = `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`
        this.mongodbConnect = mongoose.connect(this.url)
	}
    createHash(password) {
        return  bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
    isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
	async registrarUsuario(req, username, password, done) {
        let passwordEncriptado = this.createHash(password)
        try {
            //----- Revisando que el usuario no existe
            await this.mongodbConnect
            UserModels.findOne({ 'username': username }, function (err, user) {
                
                if (err) {
                    //console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                
                if (user) {
                    //console.log('User already exists');
                    return done(null, false)
                }
                //----- Si el usuario no esta se crea en Mongo
                console.log("log listar, mongoseparado :", username, password, req.body.email);
                UserModels.create(
                    {
                        username,
                        password: passwordEncriptado,
                        email: req.body.email,
                    },
                    (err, userWithId) => {
                        if (err) {
                            console.log(err)
                            return done(err, null);
                        }
                        return done(null, userWithId);
                    }
                );
            })
            
        } catch (e) {
            return done(e, null);
        }
	}
    async loginUsuario(username, password, done){
        try{
            await this.mongodbConnect
            UserModels.findOne(
				{
					username,
				
				},
				(err, user) => {
					if (err) {
						return done(err, null);
					}
					

					if (!user){
						return done(null, false)
					}

					if(!this.isValidPassword(user, password)){
						return done(null, false)
					}

					return done(null, user)
				}
			);
		} catch (e) {
			return done(e, null);
		}
    }
    
}
