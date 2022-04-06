import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"
import { Category } from "src/category/entities/category.entity"

@Entity()
export class Product {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string

    @Column()
    description: string

    @Column((type) => Category)
    categories: Category[]

    @Column()
    price: number

    @Column()
    stock: number

    @Column()
    img: string
}
