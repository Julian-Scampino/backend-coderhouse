import { Router } from 'express'
import path from 'path'

const routers = new Router()

routers.get('/', (req, res) => {
    res.redirect('/home')
})

routers.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), "/public/login.html"))
    }
})

routers.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/logout.ejs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

routers.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})

function autenticarMiddleware(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}

routers.get('/home', autenticarMiddleware, (req, res) => {
    res.render(path.join(process.cwd(), '/views/home.ejs'), { nombre: req.session.nombre })
})

export default routers