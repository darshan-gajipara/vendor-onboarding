import React from "react";
import { useAppSelector } from "@/lib/hooks";
import StepProgress from "@/components/common/StepProgress";
import Step1 from "@/steps/Step1";
import Step2 from "@/steps/Step2";
import Step3 from "@/steps/Step3";
import SuccessScreen from "./components/SuccessScreen";

const STEP_COMPONENTS: Record<number, React.FC> = {
  1: Step1,
  2: Step2,
  3: Step3,
};

const App: React.FC = () => {
  const currentStep = useAppSelector((s) => s.vendor.currentStep);
  const completedSteps = useAppSelector((s) => s.vendor.completedSteps);
  const isSubmitted = useAppSelector((s) => s.vendor.isSubmitted);

  if (isSubmitted) return <SuccessScreen />;

  const ActiveStep = STEP_COMPONENTS[currentStep];

  return (
    <div className="min-h-screen .bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-bold">
            V
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-none">
              Vendor Onboarding
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Complete all 3 steps to register as a vendor
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <StepProgress
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentStep === 1 && "Company & Contact Information"}
              {currentStep === 2 && "Address & Bank Details"}
              {currentStep === 3 && "Services & Declaration"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {currentStep === 1 &&
                "Tell us about your company and primary contact."}
              {currentStep === 2 &&
                "Provide your registered address and banking details."}
              {currentStep === 3 &&
                "Select the services you offer and confirm the declaration."}
            </p>
          </div>

          <div className="p-6">
            <ActiveStep />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Your progress is automatically saved. You can safely reload the page.
        </p>
      </main>
    </div>
  );
};

export default App;