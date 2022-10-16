const configMysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3307,
        user: 'root',
        password: 'clave1',
        database: 'productos'

    },
    pool: { min: 0, max: 7 }
}
module.exports = {configMysql}