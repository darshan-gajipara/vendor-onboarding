import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  hint?: string;
  loading?: boolean;
  className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  required,
  placeholder = "Select an option",
  disabled,
  hint,
  loading,
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <select
              id={name}
              {...field}
              disabled={disabled || loading}
              aria-invalid={!!error}
              className={cn(
                "flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2",
                "text-sm text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition-colors duration-150",
                error && "border-red-500 focus:ring-red-500",
                !field.value && "text-gray-400",
                className
              )}
            >
              <option value="" disabled>
                {loading ? "Loading…" : placeholder}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </div>
        )}
      />

      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect;