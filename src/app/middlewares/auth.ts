import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import config from '../config';

/* middleware */
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token sent from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // check user role
    const { role, userId, iat } = decoded;

    // check if the user is exists
    const user = await User.isUserExistsByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // check if the user already deleted
    const isDelete = user?.isDeleted;

    if (isDelete) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    // check if the user already blocked
    const userStatus = user?.status === 'blocked';

    if (userStatus) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChange(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
