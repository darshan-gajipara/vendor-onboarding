import { z } from "zod";

export const step2Schema = z.object({
    address: z
        .string()
        .min(1, "Address is required")
        .max(500, "Address must be under 500 characters"),

    country: z
        .string()
        .min(1, "Please select a country"),

    state: z
        .string()
        .optional(),

    zipCode: z
        .string()
        .min(1, "ZIP / PIN code is required")
        .max(10, "ZIP code must be under 10 characters")
        .regex(/^\d+$/, "ZIP code must contain only numbers"),

    bankName: z
        .string()
        .min(1, "Bank name is required")
        .max(100, "Bank name must be under 100 characters"),

    accountNumber: z
        .string()
        .min(1, "Account number is required")
        .max(30, "Account number must be under 30 characters")
        .regex(/^\d+$/, "Account number must contain only digits"),

    ifsc: z
        .string()
        .optional(),

    bankProof: z
        .object({
            name: z.string(),
            size: z.number(),
            type: z.string(),
            dbKey: z.string(),
        })
        .optional()
        .nullable(),
});

export type Step2FormData = z.infer<typeof step2Schema>;