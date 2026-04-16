import React from "react";
import { cn, STEP_LABELS } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;      
  completedSteps: number[];
}

const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  completedSteps,
}) => {
  const totalSteps = STEP_LABELS.length;
  const progressPercent = Math.round(
    ((currentStep - 1) / (totalSteps - 1)) * 100
  );

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between mb-2">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />

        <div
          className="absolute top-5 left-0 h-0.5 bg-indigo-500 z-0 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />

        {STEP_LABELS.map((stepLabel, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = currentStep === stepNumber;
          const isFuture = stepNumber > currentStep;

          return (
            <div
              key={stepNumber}
              className="relative z-10 flex flex-col items-center gap-1"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                  isCompleted &&
                    "border-indigo-500 bg-indigo-500 text-white",
                  isCurrent &&
                    "border-indigo-500 bg-white text-indigo-600 shadow-md",
                  isFuture &&
                    "border-gray-300 bg-white text-gray-400"
                )}
              >
                {isCompleted ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              <span
                className={cn(
                  "text-xs font-medium text-center leading-tight max-w-20",
                  isCurrent ? "text-indigo-600" : "text-gray-400",
                  isCompleted && "text-indigo-500"
                )}
              >
                {stepLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;