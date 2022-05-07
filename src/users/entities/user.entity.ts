import { Entity, Column, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from '../../common/entities/abstract.entity';

enum Role {
    USER = "user",
    ADMIN = "admin"
}

@Entity()
export class User extends AbstractEntity {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ nullable: true })
    personalKey: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: Role;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}
