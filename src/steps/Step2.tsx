import React, { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2FormData } from "@/schemas/step2Schema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  saveStep2,
  setBankProof,
  goToNextStep,
  goToPreviousStep,
  type FileMetadata,
} from "@/features/vendor/vendorSlice";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import FormTextarea from "@/components/common/FormTextarea";
import FormFileUpload from "@/components/common/FormFileUpload";
import { COUNTRIES, STATES_BY_COUNTRY } from "@/lib/utils";

const Step2: React.FC = () => {
  const dispatch = useAppDispatch();
  const savedData = useAppSelector((s) => s.vendor.step2);

  const methods = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      address: savedData.address ?? "",
      country: savedData.country ?? "",
      state: savedData.state ?? "",
      zipCode: savedData.zipCode ?? "",
      bankName: savedData.bankName ?? "",
      accountNumber: savedData.accountNumber ?? "",
      ifsc: savedData.ifsc ?? "",
      bankProof: savedData.bankProof ?? null,
    },
    mode: "onTouched",
  });

  const selectedCountry = useWatch({
    control: methods.control,
    name: "country",
  });

  useEffect(() => {
    methods.setValue("state", "");
  }, [selectedCountry, methods]);

  const stateOptions = selectedCountry
    ? (STATES_BY_COUNTRY[selectedCountry] ?? [])
    : [];

  const onSubmit = (data: Step2FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { bankProof: _proof, ...rest } = data;
    dispatch(saveStep2({ ...rest, bankProof: savedData.bankProof }));
    dispatch(goToNextStep());
  };

  const handleBankProofSaved = (meta: FileMetadata | null) => {
    dispatch(setBankProof(meta));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Address Details
            </h3>
            <div className="space-y-5">
              <FormTextarea
                name="address"
                label="Address Line"
                placeholder="Building, Street, Area"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormSelect
                  name="country"
                  label="Country"
                  options={COUNTRIES as unknown as { value: string; label: string }[]}
                  placeholder="Select country"
                  required
                />

                <FormSelect
                  name="state"
                  label="State / Province"
                  options={stateOptions}
                  placeholder={
                    selectedCountry
                      ? stateOptions.length
                        ? "Select state"
                        : "N/A for this country"
                      : "Select country first"
                  }
                  disabled={!selectedCountry || stateOptions.length === 0}
                />

                <FormInput
                  name="zipCode"
                  label="ZIP / PIN Code"
                  placeholder="400001"
                  required
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Bank Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                name="bankName"
                label="Bank Name"
                placeholder="HDFC Bank"
                required
              />

              <FormInput
                name="accountNumber"
                label="Account Number"
                placeholder="0123456789"
                required
                hint="Digits only"
              />

              <FormInput
                name="ifsc"
                label="IFSC / SWIFT Code"
                placeholder="HDFC0001234"
                hint="Optional — required for NEFT/RTGS"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Bank Proof Document
            </h3>
            <FormFileUpload
              name="bankProof"
              label="Upload Bank Proof"
              accept=".pdf,image/*"
              hint="Cancelled cheque, bank statement, or passbook (PDF or image)"
              onFileSaved={handleBankProofSaved}
              existingMeta={savedData.bankProof}
            />
          </div>
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
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            Save & Continue
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Step2;