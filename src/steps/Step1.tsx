import React, { useEffect, useState } from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1FormData } from "@/schemas/step1Schema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    saveStep1,
    setCompanyLogo,
    goToNextStep,
    type FileMetadata,
} from "@/features/vendor/vendorSlice";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import FormFileUpload from "@/components/common/FormFileUpload";

interface CompanyTypeOption {
    value: string;
    label: string;
}

const Step1: React.FC = () => {
    const dispatch = useAppDispatch();
    const savedData = useAppSelector((s) => s.vendor.step1);

    const [companyTypes, setCompanyTypes] = useState<CompanyTypeOption[]>([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [typeError, setTypeError] = useState<string | null>(null);

    const fetchCompanyTypes = async () => {
        setLoadingTypes(true);
        setTypeError(null);
        try {
            const res = await fetch("/mocks/companyTypes.json");
            if (!res.ok) throw new Error("Failed to fetch");
            const data: CompanyTypeOption[] = await res.json();
            setCompanyTypes(data);
        } catch {
            setTypeError("Could not load company types. Please try again.");
        } finally {
            setLoadingTypes(false);
        }
    };

    useEffect(() => {
        fetchCompanyTypes();
    }, []);

    const methods = useForm<Step1FormData>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            companyName: savedData.companyName ?? "",
            companyType: savedData.companyType ?? "",
            registrationNumber: savedData.registrationNumber ?? "",
            establishedDate: savedData.establishedDate ?? "",
            employeeCount: savedData.employeeCount !== undefined ? savedData.employeeCount : undefined,
            contactName: savedData.contactName ?? "",
            contactEmail: savedData.contactEmail ?? "",
            contactPhone: savedData.contactPhone ?? "",
            companyLogo: savedData.companyLogo ?? null,
        },
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<Step1FormData> = (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { companyLogo: _logo, ...rest } = data;
        dispatch(saveStep1({ ...rest, companyLogo: savedData.companyLogo }));
        dispatch(goToNextStep());
    };

    const handleLogoSaved = (meta: FileMetadata | null) => {
        dispatch(setCompanyLogo(meta));
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <div className="space-y-5">

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                            Company Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormInput
                                name="companyName"
                                label="Company Name"
                                placeholder="Acme Corp Pvt Ltd"
                                required
                            />

                            <div>
                                <FormSelect
                                    name="companyType"
                                    label="Company Type"
                                    options={companyTypes}
                                    loading={loadingTypes}
                                    placeholder="Select company type"
                                    required
                                />
                                {typeError && (
                                    <div className="mt-1 flex items-center gap-2 text-xs text-red-500">
                                        <span>{typeError}</span>
                                        <button
                                            type="button"
                                            onClick={fetchCompanyTypes}
                                            className="underline hover:text-red-700"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}
                            </div>

                            <FormInput
                                name="registrationNumber"
                                label="Registration Number"
                                placeholder="CIN / Registration No."
                            />

                            <FormInput
                                name="establishedDate"
                                label="Established Date"
                                type="date"
                            />

                            <FormInput
                                name="employeeCount"
                                label="Employee Count"
                                type="number"
                                min={1}
                                placeholder="e.g. 50"
                            />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormInput
                                name="contactName"
                                label="Contact Person Name"
                                placeholder="Jane Doe"
                                required
                            />

                            <FormInput
                                name="contactEmail"
                                label="Contact Email"
                                type="email"
                                placeholder="jane@acme.com"
                                required
                            />

                            <FormInput
                                name="contactPhone"
                                label="Contact Phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                required
                                hint="Minimum 6 digits"
                            />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                            Company Logo
                        </h3>
                        <FormFileUpload
                            name="companyLogo"
                            label="Upload Company Logo"
                            accept="image/*"
                            hint="PNG, JPG, SVG up to 5 MB"
                            onFileSaved={handleLogoSaved}
                            existingMeta={savedData.companyLogo}
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
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

export default Step1;