import { Column } from "typeorm";
import { AbstractEntity } from "../../common/entities/abstract.entity";

export abstract class Describe extends AbstractEntity {

    @Column()
    name: string

    @Column()
    description: string

}