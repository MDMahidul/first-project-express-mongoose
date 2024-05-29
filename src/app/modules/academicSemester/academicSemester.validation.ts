import { z } from 'zod';
import {
  AcademicSemesterName,
  AcademicSemesterCode,
  Months,
} from './academicSemester.constant';

const createAcademicSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth:z.enum([...Months] as [string,...string[]]),
    endMonth:z.enum([...Months] as [string,...string[]]),
  }),
});

const updateAcademicSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSchemaValidation,
  updateAcademicSchemaValidation,
};
