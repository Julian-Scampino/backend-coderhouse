import { buildSchema } from 'graphql';

const ProductosSchema = buildSchema(`
    input ProductoInput {
        titulo: String,
        precio: Float
    }
    type Producto {
        id: ID!,
        titulo: String,
        precio: Float
    }
    type Query {
        listar(id: ID!): Producto,
        listarAll: [Producto]
    }
    type Mutation {
        guardar(datos: ProductoInput): Producto,
        actualizar(id: ID!, datos: ProductoInput): Producto,
        borrar(id: ID!): Producto,
        borrarTodo: [Producto]
    }
`)

export default ProductosSchema