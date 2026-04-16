import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ name, label, required, hint, className, ...rest }, _ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message as string | undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        <textarea
          id={name}
          {...register(name)}
          aria-invalid={!!error}
          rows={4}
          className={cn(
            "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2",
            "text-sm placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-y transition-colors duration-150",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...rest}
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
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;