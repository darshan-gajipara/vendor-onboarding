import { z } from "zod";

export const step1Schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyType: z.string().min(1, "Company type is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(6, "Phone must be at least 6 digits"),
  registrationNumber: z.string().optional(),
  establishedDate: z.string().optional(),
  employeeCount: z
    .number()
    .int()
    .positive()
    .optional(),
  companyLogo: z.any().optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;