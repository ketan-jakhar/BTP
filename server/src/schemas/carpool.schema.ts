import { number, object, string, TypeOf, z } from 'zod';

export const createCarpoolSchema = object({
  body: object({
    source: string({
      required_error: 'Source is required',
      invalid_type_error: 'Please enter a valid source',
    }),
    destination: string({
      required_error: 'Destination is required',
      invalid_type_error: 'Please enter a valid destination',
    }),
    departure_time: string({
      required_error: 'Time is required',
      invalid_type_error: 'Please enter a valid time',
    }),
    capacity: number({
      required_error: 'Seats is required',
      invalid_type_error: 'Please enter a valid seats',
    }),
    estimated_price: number({
      required_error: 'Price is required',
      invalid_type_error: 'Please enter a valid price',
    }),
    additional_remarks: string({
      invalid_type_error: 'Please enter a valid additional_remarks',
    }),
  }),
});

export const updateCarpoolSchema = object({
  body: object({
    additional_remarks: string({
      invalid_type_error: 'Please enter a valid additional_remarks',
    }),
  }),
});

export type CreateCarpoolInput = TypeOf<typeof createCarpoolSchema>['body'];

export type UpdateCarpoolInput = TypeOf<typeof updateCarpoolSchema>['body'];
