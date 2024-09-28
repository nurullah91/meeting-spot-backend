import { z } from 'zod';

const createSlotValidationSchema = z
  .object({
    room: z.string().nonempty({ message: 'Room ID is required' }),
    date: z
      .string()
      .nonempty({ message: 'Date is required' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Invalid date format, should be YYYY-MM-DD',
      }),
    startTime: z
      .string()
      .nonempty({ message: 'Start time is required' })
      .regex(/^\d{2}:\d{2}$/, {
        message: 'Invalid time format, should be HH:MM',
      }),
    endTime: z
      .string()
      .nonempty({ message: 'End time is required' })
      .regex(/^\d{2}:\d{2}$/, {
        message: 'Invalid time format, should be "HH:MM" in 24 hours',
      }),
    isBooked: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(`2002-01-01T${data.startTime}:00`);
      const end = new Date(`2002-01-01T${data.endTime}:00`);
      return end > start;
    },
    {
      message: 'Start time should be before end time!',
      path: ['endTime'],
    },
  );

const updateSlotValidationSchema = z
  .object({
    room: z.string().nonempty({ message: 'Room ID is required' }).optional(),
    date: z
      .string()
      .nonempty({ message: 'Date is required' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Invalid date format, should be YYYY-MM-DD',
      })
      .optional(),
    startTime: z
      .string()
      .nonempty({ message: 'Start time is required' })
      .regex(/^\d{2}:\d{2}$/, {
        message: 'Invalid time format, should be HH:MM',
      })
      .optional(),
    endTime: z
      .string()
      .nonempty({ message: 'End time is required' })
      .regex(/^\d{2}:\d{2}$/, {
        message: 'Invalid time format, should be "HH:MM" in 24 hours',
      })
      .optional(),
    isBooked: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(`2002-01-01T${data.startTime}:00`);
      const end = new Date(`2002-01-01T${data.endTime}:00`);
      return end > start;
    },
    {
      message: 'Start time should be before end time!',
      path: ['endTime'],
    },
  );

export const SlotsValidation = {
  createSlotValidationSchema,
  updateSlotValidationSchema,
};
