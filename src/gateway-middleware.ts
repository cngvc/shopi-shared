import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';
import dotenv from 'dotenv';
dotenv.config({});

const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

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
    if (!tokens.includes(payload.id)) {
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
