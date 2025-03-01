import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';
import dotenv from 'dotenv';
dotenv.config({});

const tokens = [
  'auth',
  'store',
  'product',
  'search',
  'buyer',
  'message',
  'order',
  'review',
] as const;

export type GatewayToken = (typeof tokens)[number];

export function verifyGatewayRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers['gateway-token'] as string | undefined;
  if (!token) {
    throw new NotAuthorizedError(
      'Invalid request',
      'verifyGatewayRequest(): Request not coming from api gateway'
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
        'Invalid request',
        'verifyGatewayRequest(): Request payload is invalid'
      );
    }
  } catch (error) {
    throw new NotAuthorizedError(
      'Invalid request',
      'verifyGatewayRequest(): Request not coming from api gateway'
    );
  }
  next();
}
