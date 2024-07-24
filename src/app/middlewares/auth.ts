import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';
import { NextFunction, Request, Response } from 'express';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];

    // check if the token missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { email, role } = decoded;

    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized for this action',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
