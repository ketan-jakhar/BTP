import { number, object, string, TypeOf, z, boolean } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
      invalid_type_error: 'Please enter a valid name',
    }),
    price: number({
      required_error: 'Price is required',
      invalid_type_error: 'Please enter a valid price',
    }),
    category: string({
      required_error: 'Category is required',
      invalid_type_error: 'Please enter a valid category',
    }),
    description: string({
      invalid_type_error: 'Please enter a valid category',
    }),
    additional_remarks: string({
      invalid_type_error: 'Please enter a valid category',
    }),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];
