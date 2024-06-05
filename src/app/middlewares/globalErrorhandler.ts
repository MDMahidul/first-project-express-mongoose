import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSources = [
    { path: '', message: 'Something went wrong!' },
  ];

  // check the error provider
  if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorSources = simplified?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplified = handleValidationError(err);
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorSources = simplified?.errorSources;
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
