import passport from "passport";
import { Strategy } from "passport-local";
import MyConnectionFactory from '../persistencia/UsuariosFactory.js'
import * as dotenv from 'dotenv'
dotenv.config()

const localStrategy = Strategy;
const connectionDbb = (new MyConnectionFactory).returnDbConnection()

passport.use(
	"register",
	new localStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			console.log("register", username + password);
			/// --- Conectando a mongodbAtlas
			await connectionDbb.registrarUsuario(req, username, password, done)
		}
	)
);
passport.use(
	"login",
	new localStrategy(async(username, password, done) => {
		/// --- Conectando a mongodbAtlas
		await connectionDbb.loginUsuario(username, password, done)
	})
);
//serializar y deserializar
passport.serializeUser((usuario, done) => {
	console.log(usuario);
	done(null, usuario._id);
});
passport.deserializeUser(async(id, done) => {
	//UserModels.findById(id, done);
	//Probando de otra manera
	const objetoUsuario = await connectionDbb.buscarUsuarioID(id)
	//console.log("en el codigo de deserializeUser, findById: ", objetoUsuario);
	return done(null, objetoUsuario)
});
export {passport}