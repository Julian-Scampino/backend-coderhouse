import path from 'path'
import parseArgs from "minimist"
import { fork } from "child_process"
///------------- DE ESTE DESAFIO USANDO EL OBJETO PROCESS, clases 27 y 28 ------------- ///
const getInfo = (req, res)=>{
    res.render(path.join(process.cwd(), '/views/info.ejs'), {
        //No me toma el default, pero si se ingresa por informacion por consola la toma
        argv: JSON.stringify(parseArgs(process.argv.slice(2))) ,
        path: process.argv[1],
        sistema: process.platform,
        processId: process.pid,
        version: process.version,
        carpeta: process.cwd(),
        memoria: process.memoryUsage().rss
    })
    //console.log(parseArgs(process.argv.slice(2)));
}
const getRandoms = (req, res)=>{
    const forked = fork(path.join(process.cwd(), './servicio/calculo.js'))
    forked.on('message', msg =>{
        res.send(msg)
    })
    forked.send(req?.query?.cant || 100000)        
}
export {getInfo, getRandoms}