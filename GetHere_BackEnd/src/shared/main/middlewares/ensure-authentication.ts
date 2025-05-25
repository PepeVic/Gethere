import TokenValidationError from '../../../shared/errors/TokenValidationError';
import validateGoogleToken from '../../../shared/main/helpers/validateGoogleToken';
import { Request, Response, NextFunction } from 'express';

export default async function ensureAuthenticationMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  if (!request.headers?.gtoken)
    throw new TokenValidationError('Token is missing');

  await validateGoogleToken(request.headers?.gtoken as string);
  next();
}
