import { Entity, Column, ManyToMany, JoinTable } from "typeorm"
import { Describe } from "../../common/entities/describe.entity"
import { Category } from "../../category/entities/category.entity"

@Entity()
export class Product extends Describe {

    @ManyToMany(() => Category, category => category.products)
    @JoinTable()
    categories: Category[]

    @Column()
    price: number

    @Column()
    stock: number

    @Column()
    productImage: string
}
