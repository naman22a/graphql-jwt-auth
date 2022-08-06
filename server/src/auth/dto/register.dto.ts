import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(6)
    password: string;
}
