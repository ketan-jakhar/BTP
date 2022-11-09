import { number, object, string, TypeOf, z } from 'zod';
import { UserRole } from '../types/enums';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
      invalid_type_error: 'Please enter a valid name',
    }),
    email: string({
      required_error: 'Email address is required',
    })
      .email('Invalid email address')
      .endsWith('lnmiit.ac.in', 'Please use your lnmiit email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
    contact_number: number({
      required_error: 'Contact number is required',
      invalid_type_error: 'Please enter a valid contact number',
    })
      .int('Contact number must be an integer')
      .positive('Contact number must be a positive number')
      .min(1000000000, 'Please enter a valid contact number')
      .max(9999999999, 'Please enter a valid contact number'),
    role: z.optional(z.nativeEnum(UserRole)),
  }).refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
      invalid_type_error: 'Please enter a valid name',
    })
      .email('Invalid email address')
      .endsWith('lnmiit.ac.in', 'Please use your lnmiit email address'),
    password: string({
      required_error: 'Password is required',
      invalid_type_error: 'Please enter a valid email address',
    }).min(8, 'Invalid email or password'),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
