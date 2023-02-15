import { Types } from "mongoose";
import { ProductInterface } from "src/product/interface/product.interface";

export interface CarritoInterface {
    productos: ProductInterface[];
    _id:  Types.ObjectId;
}