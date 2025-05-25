import TokenValidationError from '../../../shared/errors/TokenValidationError';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

export default async (token: string): Promise<TokenPayload> => {
  try {
    const client = new OAuth2Client(process.env.CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    if (!payload || !payload?.email)
      throw new TokenValidationError('[Google Auth Error] Email required');

    return payload;
  } catch (err) {
    console.log('err', err);
    throw new TokenValidationError('[Google Auth Error] Invalid Token');
  }
};
