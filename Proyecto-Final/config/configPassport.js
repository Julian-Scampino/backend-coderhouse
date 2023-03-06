import passport from "passport";
import { Strategy } from "passport-local";
import MyConnectionFactory from "../persistencia/Usuarios/UsuariosFactory.js";
import * as dotenv from "dotenv";
dotenv.config();
import passportJwt from "passport-jwt";
import mongoose from "mongoose";
const localStrategy = Strategy;
const conectionUsuarioDB = new MyConnectionFactory().returnDbConnection();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOptions = {
    secretOrKey: process.env.JWT_SIGN,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            await mongoose.connect(
                `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`
            );
            const user = await conectionUsuarioDB.buscarUsuarioEmail(
                payload.email
            );
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (e) {
            return done(e, false);
        }
    })
);

passport.use(
    "register",
    new localStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
            passwordField: "password",
        },
        async (req, email, password, done) => {
            await conectionUsuarioDB.registrarUsuario(
                req,
                email,
                password,
                done
            );
        }
    )
);
passport.use(
    "login",
    new localStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            await conectionUsuarioDB.loginUsuario(email, password, done);
        }
    )
);
passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
});
passport.deserializeUser(async (id, done) => {
    const objetoUsuario = await conectionUsuarioDB.buscarUsuarioID(id);
    return done(null, objetoUsuario);
});
export { passport };
