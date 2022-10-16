const {configMysql} = require("./configMariaDB")
const knex = require('knex')(configMysql)
const {configSqlite3} = require("./configSqlite3")
const knexOtro = require('knex')(configSqlite3)

knex.schema.createTable('productos', (table) => {
    table.string('titulo')
    table.integer('precio')
    table.string('url')
})
.then(() => {
    console.log("tabla de productos creada");
})
.catch((err)=> console.log(err))
.finally(()=>{
    knex.destroy()
})

knexOtro.schema.createTable('chat', (table) => {
    table.string('email')
    table.string('fecha')
    table.string('mensaje')
})
.then(() => {
    console.log("tabla de chat creada");
})
.catch((err)=> console.log(err))
.finally(()=>{
    knexOtro.destroy()
})
