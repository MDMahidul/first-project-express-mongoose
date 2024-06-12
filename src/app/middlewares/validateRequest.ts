import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

/* middleware */
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation
    //zod validation schema
    await schema.parseAsync({ body: req.body });
    next();
  });
};

export default validateRequest;
