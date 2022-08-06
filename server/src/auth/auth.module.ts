import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';

@Module({
    imports: [UsersModule],
    providers: [AuthResolver],
    controllers: [AuthController]
})
export class AuthModule {}
