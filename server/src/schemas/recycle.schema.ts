import { number, object, string, TypeOf, z, boolean } from 'zod';

export const createRecycleSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
      invalid_type_error: 'Please enter a valid name',
    }),
    category: string({
      required_error: 'Category is required',
      invalid_type_error: 'Please enter a valid category',
    }),
    remarks: string({
      invalid_type_error: 'Please enter a valid category',
    }),
  }),
});

export const updateRecycleSchema = object({
  body: object({
    name: string({
      invalid_type_error: 'Please enter a valid name',
    }),
    category: string({
      invalid_type_error: 'Please enter a valid category',
    }),
    remarks: string({
      invalid_type_error: 'Please enter a valid category',
    }),
  }),
});

export type CreateRecycleInput = TypeOf<typeof createRecycleSchema>['body'];

export type UpdateRecycleInput = TypeOf<typeof updateRecycleSchema>['body'];
