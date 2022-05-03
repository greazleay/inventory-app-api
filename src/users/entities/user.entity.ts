import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';

enum Role {
    USER = "user",
    ADMIN = "admin"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

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

    @Column()
    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    @VersionColumn()
    version!: number;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}
