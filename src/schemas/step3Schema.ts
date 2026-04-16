import { z } from "zod";

export const SERVICES_OPTIONS = [
    { value: "consulting", label: "Consulting" },
    { value: "software", label: "Software Development" },
    { value: "design", label: "Design & Creative" },
    { value: "marketing", label: "Marketing & Advertising" },
    { value: "logistics", label: "Logistics & Supply Chain" },
    { value: "legal", label: "Legal Services" },
    { value: "finance", label: "Finance & Accounting" },
    { value: "hr", label: "HR & Staffing" },
    { value: "it_support", label: "IT Support" },
    { value: "manufacturing", label: "Manufacturing" },
] as const;

export const PRICING_MODELS = [
    { value: "subscription", label: "Subscription" },
    { value: "one_time", label: "One-time" },
    { value: "pay_per_use", label: "Pay-per-use" },
] as const;

export const CURRENCIES = [
    { value: "INR", label: "INR — Indian Rupee" },
    { value: "USD", label: "USD — US Dollar" },
    { value: "EUR", label: "EUR — Euro" },
    { value: "GBP", label: "GBP — British Pound" },
    { value: "AED", label: "AED — UAE Dirham" },
    { value: "SGD", label: "SGD — Singapore Dollar" },
] as const;

export const step3Schema = z.object({
    services: z
        .array(z.string())
        .min(1, "Please select at least one service"),

    pricingModel: z
        .string()
        .min(1, "Please select a pricing model"),

    currency: z
        .string()
        .optional(),

    declaration: z.boolean(),

    notes: z
        .string()
        .max(1000, "Notes must be under 1000 characters")
        .optional(),

    finalDoc: z
        .object({
            name: z.string(),
            size: z.number(),
            type: z.string(),
            dbKey: z.string(),
        })
        .optional()
        .nullable(),
});

export type Step3FormData = z.infer<typeof step3Schema>;