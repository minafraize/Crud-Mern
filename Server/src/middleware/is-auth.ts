import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { errorHandler } from '../utils/error';

// ----------------------------------------------------------------------

const isAuth = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return errorHandler('Not authenticated.', 401);
  }

  const token = authHeader.split(' ')[1];
  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err: any) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    return errorHandler('Not authenticated.', 401);
  }
  req.userId = decodedToken.userId;
  next();
};

export default isAuth