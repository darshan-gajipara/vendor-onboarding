import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step3Schema,
  type Step3FormData,
  SERVICES_OPTIONS,
  PRICING_MODELS,
  CURRENCIES,
} from "@/schemas/step3Schema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  saveStep3,
  setFinalDoc,
  submitForm,
  goToPreviousStep,
  type FileMetadata,
} from "@/features/vendor/vendorSlice";
import FormSelect from "@/components/common/FormSelect";
import FormTextarea from "@/components/common/FormTextarea";
import FormFileUpload from "@/components/common/FormFileUpload";
import { cn } from "@/lib/utils";

const Step3: React.FC = () => {
  const dispatch = useAppDispatch();
  const savedData = useAppSelector((s) => s.vendor.step3);

  const methods = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      services: savedData.services ?? [],
      pricingModel: savedData.pricingModel ?? "",
      currency: savedData.currency ?? "INR",
      declaration: savedData.declaration ?? false,
      notes: savedData.notes ?? "",
      finalDoc: savedData.finalDoc ?? null,
    },
    mode: "onTouched",
  });

  const {
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: Step3FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { finalDoc: _doc, ...rest } = data;
    dispatch(saveStep3({ ...rest, finalDoc: savedData.finalDoc }));
    dispatch(submitForm());
  };

  const handleFinalDocSaved = (meta: FileMetadata | null) => {
    dispatch(setFinalDoc(meta));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Services Offered <span className="text-red-500">*</span>
            </h3>
            <Controller
              name="services"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICES_OPTIONS.map((svc) => {
                    const checked = field.value.includes(svc.value);
                    return (
                      <label
                        key={svc.value}
                        className={cn(
                          "flex items-center gap-2.5 rounded-md border px-3 py-2.5 cursor-pointer transition-colors",
                          checked
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="checkbox"
                          value={svc.value}
                          checked={checked}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...field.value, svc.value]
                              : field.value.filter((v) => v !== svc.value);
                            field.onChange(next);
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                        <span className="text-sm font-medium">{svc.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            {errors.services && (
              <p className="mt-2 text-xs text-red-500">
                ⚠ {errors.services.message as string}
              </p>
            )}
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Pricing Model <span className="text-red-500">*</span>
            </h3>
            <Controller
              name="pricingModel"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-3">
                  {PRICING_MODELS.map((pm) => {
                    const selected = field.value === pm.value;
                    return (
                      <label
                        key={pm.value}
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-5 py-2 cursor-pointer transition-all",
                          selected
                            ? "border-indigo-500 bg-indigo-500 text-white shadow-sm"
                            : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                        )}
                      >
                        <input
                          type="radio"
                          value={pm.value}
                          checked={selected}
                          onChange={() => field.onChange(pm.value)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{pm.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            {errors.pricingModel && (
              <p className="mt-2 text-xs text-red-500">
                ⚠ {errors.pricingModel.message as string}
              </p>
            )}
          </div>

          <div className="max-w-xs">
            <FormSelect
              name="currency"
              label="Preferred Currency"
              options={CURRENCIES as unknown as { value: string; label: string }[]}
              placeholder="Select currency"
            />
          </div>

          <hr className="border-gray-100" />

          <FormTextarea
            name="notes"
            label="Additional Notes"
            placeholder="Any other information you'd like to share…"
            rows={3}
          />

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              KYC / Final Document
            </h3>
            <FormFileUpload
              name="finalDoc"
              label="Upload KYC Proof"
              accept=".pdf,image/*"
              hint="PAN card, Aadhaar, or company KYC document"
              onFileSaved={handleFinalDocSaved}
              existingMeta={savedData.finalDoc}
            />
          </div>

          <hr className="border-gray-100" />
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => dispatch(goToPreviousStep())}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting…
              </>
            ) : (
              <>
                Submit Application
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Step3;