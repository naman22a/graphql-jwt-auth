import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { MyContext, AccessTokenPayload } from 'src/types';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(
            context
        ).getContext() as MyContext;

        const authorization = ctx.req.headers['authorization'];

        if (!authorization) {
            throw new UnauthorizedException();
        }

        try {
            const token = authorization.split(' ')[1];
            const payload = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET
            ) as AccessTokenPayload;
            ctx.payload = payload;

            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
