import {passport} from '../../config/configPassport.js'

const autenticacionLogin = () => {
     return passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: "/error-login",
    })
}
const autenticacionRegister = () => {
    return passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/error-register",
	})
}

const checkAuthentication = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next()
    }else{
        return res.redirect('/login')
    }
}

export {autenticacionLogin, autenticacionRegister, checkAuthentication}