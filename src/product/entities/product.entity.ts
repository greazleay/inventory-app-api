import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm"
import { Category } from "src/category/entities/category.entity"

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Category, category => category.products)
    @JoinTable()
    categories: Category[]

    @Column()
    price: number

    @Column()
    stock: number

    @Column()
    img: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    @VersionColumn()
    version: number
}
