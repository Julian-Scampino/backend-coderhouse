import { Application, Router, Response, Request, FormDataBody } from "https://deno.land/x/oak/mod.ts";


const app = new Application();
const router = new Router();

const colores : string[] = []


router.get("/", (constext) =>{
  let lista = ""
  if (colores.length > 0){
    colores.map(element =>{
      return lista += `<ul style='color:${element}'>${element}</ul>`
    })
  }
  constext.response.body = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                  body{
                      background-color: black;
                      color: white;
                  }
              </style>
              <title>Document</title>
          </head>
          <body>
            <h1>Escriba un color</h1>
            <Formulario/>
            <form action="/" method="post">
              <input type="text" name="color" />
              <button type="submit" onSubmit={enviarFormulario}>Enviar</button>
            </form> <div>${lista}</div>
            </body>
            <script></>
        </html>`
})
router.post("/", async context => {
  const body = await context.request.body({ type: 'form'})
  const data = await body.value
  let dataFINAL
  for (const [key, value] of data) {
    dataFINAL = value;
  }
  colores.push( dataFINAL.toString())
  context.response.redirect('/')
  
})

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });