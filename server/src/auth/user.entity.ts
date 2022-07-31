import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";
// import { IsEmail } from "class-validator";

/*
    typeorm has the following features:
    - Entity: a class that represents a table in the database
    - Column: a property of an entity that maps to a column in the database
    - PrimaryGeneratedColumn: a special column that is automatically generated when a new entity is created
    - BaseEntity: a class that is extended by all other entities
    - OneToMany: a relationship between two entities that is one-to-many
    - ManyToOne: a relationship between two entities that is many-to-one
    - ManyToMany: a relationship between two entities that is many-to-many
    - JoinColumn: a column that is used to join two entities together   §
    - JoinTable: a table that is used to join two entities together
    - OneToOne: a relationship between two entities that is one-to-one
*/

// at the database level - when creating new entity
@Unique(["username"])
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // Good practice is to hold salt in the database
    @Column()
    salt: string;

    @Column()
    email: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];

    // Custom method to validate password
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }


}