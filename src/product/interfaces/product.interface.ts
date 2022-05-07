import { Product } from "../entities/product.entity";
import { IMeta } from "../../common/interfaces/paginate.interface";

export interface IProductResponse {
    products: Product[];
    meta: IMeta;
}