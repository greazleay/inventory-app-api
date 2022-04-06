import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class Category {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string

    @Column()
    description: string
}
