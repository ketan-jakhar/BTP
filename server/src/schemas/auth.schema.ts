import { object, string, TypeOf, z } from 'zod';

export const forgotPasswordSchema = object({
  body: object({
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
  }).refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
