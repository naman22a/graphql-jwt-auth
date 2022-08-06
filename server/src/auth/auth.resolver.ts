import {
    Mutation,
    Resolver,
    Args,
    ObjectType,
    Field,
    Context,
    Query,
    Int
} from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MyContext } from 'src/types';
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken
} from './utils';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/user.model';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;

    @Field(() => User)
    user: User;
}

@Resolver()
export class AuthResolver {
    constructor(private usersService: UsersService) {}

    @Mutation(() => Boolean)
    async register(
        @Args('RegisterDto') registerDto: RegisterDto
    ): Promise<boolean> {
        const { name, email, password } = registerDto;

        const userExists = await this.usersService.findOneByEmail(email);

        if (userExists) {
            throw new Error('User Exists');
        }

        try {
            const hashedPassword = await argon2.hash(password);

            await this.usersService.create({
                name,
                email,
                password: hashedPassword
            });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Args('LoginDto') loginDto: LoginDto,
        @Context() { res }: MyContext
    ): Promise<LoginResponse> {
        const { email, password } = loginDto;

        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new Error('User does not exist');
        }

        const isMatch = await argon2.verify(user.password, password);

        if (!isMatch) {
            throw new Error('Password is incorrect');
        }

        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
            user
        };
    }

    @Query(() => User)
    @UseGuards(AuthGuard)
    async me(@Context() { payload }: MyContext): Promise<User> {
        return await this.usersService.findOneById(payload.userId);
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUsers(
        @Args({ name: 'userId', type: () => Int }) userId: number
    ) {
        await this.usersService.incrementTokenVersion(userId);
        return true;
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async logout(@Context() { res }: MyContext): Promise<boolean> {
        sendRefreshToken(res, '');
        return true;
    }
}
