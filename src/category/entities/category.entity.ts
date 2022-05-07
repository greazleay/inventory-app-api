import { Entity, ManyToMany } from "typeorm";
import { Describe } from "../../common/entities/describe.entity";
import { Product } from "../../product/entities/product.entity";

@Entity()
export class Category extends Describe {

    @ManyToMany(() => Product, product => product.categories)
    products: Product[]

}
