import { z } from 'zod';

const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: "Password can't be more than 20 characters" }),
});

export const UserValidation = {
  UserValidationSchema,
};