import { Request, Response } from 'express';

export type MyContext = {
    req: Request;
    res: Response;
    payload?: {
        userId: number;
    };
};

export type AccessTokenPayload = {
    userId: number;
};

export type RefreshTokenPayload = {
    userId: number;
    tokenVersion: number;
};
