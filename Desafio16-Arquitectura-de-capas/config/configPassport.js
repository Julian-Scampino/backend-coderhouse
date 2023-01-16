import passport from "passport";
import { Strategy } from "passport-local";
import UserModels from '../persistencia/models/userModels.js'
import ClassMongoPassport from '../persistencia/mongodb.js'
import * as dotenv from 'dotenv'
dotenv.config()

const localStrategy = Strategy;
const ClassMongoPassportImportado = new ClassMongoPassport

passport.use(
	"register",
	new localStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			console.log("register", username + password);
			/// --- Conectando a mongodbAtlas
			await ClassMongoPassportImportado.registrarUsuario(req, username, password, done)
		}
	)
);
passport.use(
	"login",
	new localStrategy(async(username, password, done) => {
		/// --- Conectando a mongodbAtlas
		await ClassMongoPassportImportado.loginUsuario(username, password, done)
	})
);
//serializar y deserializar
passport.serializeUser((usuario, done) => {
	console.log(usuario);
	done(null, usuario._id);
});
passport.deserializeUser((id, done) => {
	UserModels.findById(id, done);
});
export {passport}