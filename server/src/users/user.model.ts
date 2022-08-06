import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column('int', { default: 0 })
    tokenVersion: number;
}
