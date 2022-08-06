import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { RefreshTokenPayload } from 'src/types';
import { UsersService } from 'src/users/users.service';
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken
} from './utils';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @Post('/refresh_token')
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies['jid'];

        if (!token) {
            return res.json({ ok: false, accessToken: '' });
        }

        let payload: RefreshTokenPayload | null = null;
        try {
            payload = verify(
                token,
                process.env.REFRESH_TOKEN_SECRET
            ) as RefreshTokenPayload;
        } catch (error) {
            return res.json({ ok: false, accessToken: '' });
        }

        const user = await this.usersService.findOneById(payload.userId);

        if (!user) {
            return res.json({ ok: false, accessToken: '' });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.json({ ok: false, accessToken: '' });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.json({ ok: true, accessToken: createAccessToken(user) });
    }
}
