import { passport } from "../../config/configPassport.js";

const autenticacionLogin = () => {
    return passport.authenticate("login", {
        failureRedirect: "/error-login",
        session: false,
    });
};
const autenticacionRegister = () => {
    return passport.authenticate("register", {
        failureRedirect: "/error-register",
        session: false,
    });
};

const checkAuthentication = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (user) {
            req.user = user;
            next();
        }
        if (!user) {
            next();
        }
    })(req, res, next);
};

export { autenticacionLogin, autenticacionRegister, checkAuthentication };
