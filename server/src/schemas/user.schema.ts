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
      .endsWith('@lnmiit.ac.in', 'Please use your lnmiit email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    password_confirm: string({
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
  }).refine(data => data.password === data.password_confirm, {
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
      .endsWith('@lnmiit.ac.in', 'Please use your lnmiit email address'),
    password: string({
      required_error: 'Password is required',
      invalid_type_error: 'Please enter a valid email address',
    }).min(8, 'Invalid email or password'),
  }),
});

export const updateUserSchema = object({
  body: object({
    payload: object({
      name: string({
        invalid_type_error: 'Please enter a valid name',
      }),
      email: string({
        invalid_type_error: 'Please enter a valid email',
      })
        .email('Invalid email address')
        .endsWith('@lnmiit.ac.in', 'Please use your lnmiit email address'),
      contact_number: number({
        invalid_type_error: 'Please enter a valid contact number',
      })
        .int('Contact number must be an integer')
        .positive('Contact number must be a positive number')
        .min(1000000000, 'Please enter a valid contact number')
        .max(9999999999, 'Please enter a valid contact number'),
    }),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'password_confirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];

export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
