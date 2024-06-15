import jwt from 'jsonwebtoken';
import { IUser } from './user.interface';

export const createToken = (
  jwtPayload: { email: string; phone: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
