import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { __prod__ } from './constants';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { MyContext } from './types';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User],
            synchronize: !__prod__,
            logging: !__prod__
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req, res }): MyContext => ({ req, res }),
            cors: {
                origin: 'http://localhost:3000',
                credentials: true
            }
        }),
        AuthModule,
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
