import { Router } from 'express'
import path from 'path'
import parseArgs from "minimist"
import { fork } from "child_process"
///------------- DE ESTE DESAFIO NUEVO ------------- ///
const routerDesafioNuevo = new Router()
routerDesafioNuevo.get("/info", (req, res)=>{
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
})


routerDesafioNuevo.get("/randoms", (req, res)=>{
    /* const forked = fork(path.join(process.cwd(), 'calculo.js'))
    forked.on('message', msg =>{
        res.send(msg)
    })
    forked.send(req?.query?.cant || 100000)*/

    // Este desafio pide desactivar el child_process de la ruta '/randoms'
    let msg = req?.query?.cant || 100000
    let numeros = [];
    let objetoNumeros = [];
    const generarNumeros = () => {
        for (let i = 0; i < msg; i++) { 		
            numeros.push(parseInt(Math.random() * 1000 + 1)); 	
        }
        verificar(); 
        return objetoNumeros
    }; 
    const verificar = () => { 	
        let contador = 0; 	
        let indice; 	
        for (let j = 1; j <= 1000; ) { 		
            indice = numeros.indexOf(j);
            if (indice != -1) { 			
                contador++; 			
                numeros.splice(indice, 1); 		
            } else { 			
                objetoNumeros.push({ [j]: contador }); 			
                contador = 0; 			
                j++; 		
            } 	
        }
    };
    res.send(generarNumeros())
})

export default routerDesafioNuevo