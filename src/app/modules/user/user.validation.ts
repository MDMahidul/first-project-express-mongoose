import { z } from 'zod';
import { userStatus } from './user.constant';

const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: "Password can't be more than 20 characters" }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  changeStatusValidationSchema,
};
