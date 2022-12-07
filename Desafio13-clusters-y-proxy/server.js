const express = require("express");
const numCPUs = require("os").cpus().length
const path = require("path")
const parseArgs = require("minimist")
const {fork} = require("child_process");
const { send } = require("process");


const app = express();
const PORT = parseInt(process.argv[2]) || 8080;

app.set('view engine', 'ejs');

app.get("/api/info", (req, res) => {
        res.render(path.join(process.cwd(), 'info.ejs'), {
            argv: JSON.stringify(parseArgs(process.argv.slice(2))) ,
            path: process.argv[1],
            sistema: process.platform,
            processId: process.pid,
            version: process.version,
            carpeta: process.cwd(),
            memoria: process.memoryUsage().rss,
            numCPUs: numCPUs
        })
});

app.get("/api/randoms", (req, res)=>{
    const forked = fork(path.join(process.cwd(), 'calculo.js'))
    forked.on('message', msg =>{
        // Se envia el puerto y los numeros randoms
        res.send([{port: PORT}, {msg}])
    })
    forked.send(req?.query?.cant || 1000)
})

app.listen(PORT, (err) => {
    if (!err)
      console.log(
        `servidor escuchando en express ${PORT} - PID WORKER ${process.pid}`
      );
  });

