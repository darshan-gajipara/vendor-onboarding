import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export function isImageFile(type: string): boolean {
  return type.startsWith("image/");
}


export const COUNTRIES = [
  { value: "IN", label: "India" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
] as const;

export const STATES_BY_COUNTRY: Record<string, { value: string; label: string }[]> = {
  IN: [
    { value: "MH", label: "Maharashtra" },
    { value: "KA", label: "Karnataka" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "DL", label: "Delhi" },
    { value: "GJ", label: "Gujarat" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "WB", label: "West Bengal" },
    { value: "RJ", label: "Rajasthan" },
    { value: "MP", label: "Madhya Pradesh" },
    { value: "PB", label: "Punjab" },
  ],
  US: [
    { value: "CA", label: "California" },
    { value: "TX", label: "Texas" },
    { value: "NY", label: "New York" },
    { value: "FL", label: "Florida" },
    { value: "WA", label: "Washington" },
    { value: "IL", label: "Illinois" },
  ],
  GB: [
    { value: "ENG", label: "England" },
    { value: "SCT", label: "Scotland" },
    { value: "WLS", label: "Wales" },
    { value: "NIR", label: "Northern Ireland" },
  ],
  AU: [
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
  ],
  CA: [
    { value: "ON", label: "Ontario" },
    { value: "BC", label: "British Columbia" },
    { value: "QC", label: "Quebec" },
    { value: "AB", label: "Alberta" },
  ],
};

export const STEP_LABELS = [
  "Company & Contact",
  "Address & Banking",
  "Services & Declaration",
] as const;