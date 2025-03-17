import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './responses/error-handler';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IAuthPayload } from './auth.interface';
dotenv.config({});

const tokens = [
  'auth',
  'store',
  'product',
  'order',
  'search',
  'buyer',
  'message',
  'review',
  'cart',
  'online-status',
] as const;

export type GatewayToken = (typeof tokens)[number];

export class AuthMiddleware {
  private constructor() {}
  static verifyGatewayRequest(
    req: Request,
    _: Response,
    next: NextFunction
  ): void {
    const token = req.headers['gateway-token'] as string | undefined;
    if (!token) {
      throw new NotAuthorizedError(
        'Invalid request, request was not coming from api gateway',
        'verifyGatewayRequest method'
      );
    }
    try {
      const payload = jwt.verify(
        token,
        process.env.GATEWAY_JWT_TOKEN_SECRET || ''
      ) as {
        id: string;
        iat: number;
      };
      if (!tokens.includes(payload.id as GatewayToken)) {
        throw new NotAuthorizedError(
          'Invalid request, request payload is invalid.',
          'verifyGatewayRequest'
        );
      }
    } catch (error) {
      throw new NotAuthorizedError(
        'Invalid request, request was not coming from api gateway.',
        'verifyGatewayRequest'
      );
    }
    next();
  }
}
