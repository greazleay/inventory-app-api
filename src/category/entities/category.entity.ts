import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToMany } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Product, product => product.categories)
    products: Product[]

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
