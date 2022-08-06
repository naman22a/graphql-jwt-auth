import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(() => [User])
    async users() {
        return await this.usersService.findAll();
    }
}
