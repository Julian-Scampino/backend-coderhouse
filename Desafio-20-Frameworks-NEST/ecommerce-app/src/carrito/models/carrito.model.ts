import { Schema, model } from 'mongoose';

const carritoSchema = new Schema({
  productos: {type: Array}
});

export const CarritoModel = model('carrito', carritoSchema);
