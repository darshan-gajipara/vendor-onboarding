import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Step1FormData } from "@/schemas/step1Schema";
import type { Step2FormData } from "@/schemas/step2Schema";
import type { Step3FormData } from "@/schemas/step3Schema";

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  dbKey: string;
}

export type Step1State = Omit<Step1FormData, "companyLogo"> & {
  companyLogo?: FileMetadata | null;
};

export type Step2State = Omit<Step2FormData, "bankProof"> & {
  bankProof?: FileMetadata | null;
};

export type Step3State = Omit<Step3FormData, "finalDoc"> & {
  finalDoc?: FileMetadata | null;
};

interface VendorState {
  currentStep: number;          
  completedSteps: number[];     
  step1: Partial<Step1State>;
  step2: Partial<Step2State>;
  step3: Partial<Step3State>;
  isSubmitted: boolean;
}

const initialState: VendorState = {
  currentStep: 1,
  completedSteps: [],
  step1: {},
  step2: {},
  step3: {},
  isSubmitted: false,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },

    goToNextStep(state) {
      if (state.currentStep < 3) {
        if (!state.completedSteps.includes(state.currentStep)) {
          state.completedSteps.push(state.currentStep);
        }
        state.currentStep += 1;
      }
    },

    goToPreviousStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    saveStep1(state, action: PayloadAction<Partial<Step1State>>) {
      state.step1 = { ...state.step1, ...action.payload };
    },

    saveStep2(state, action: PayloadAction<Partial<Step2State>>) {
      state.step2 = { ...state.step2, ...action.payload };
    },

    saveStep3(state, action: PayloadAction<Partial<Step3State>>) {
      state.step3 = { ...state.step3, ...action.payload };
    },

    setCompanyLogo(state, action: PayloadAction<FileMetadata | null>) {
      state.step1.companyLogo = action.payload;
    },

    setBankProof(state, action: PayloadAction<FileMetadata | null>) {
      state.step2.bankProof = action.payload;
    },

    setFinalDoc(state, action: PayloadAction<FileMetadata | null>) {
      state.step3.finalDoc = action.payload;
    },

    submitForm(state) {
      if (!state.completedSteps.includes(state.currentStep)) {
        state.completedSteps.push(state.currentStep);
      }
      state.isSubmitted = true;
    },

    resetForm() {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  goToNextStep,
  goToPreviousStep,
  saveStep1,
  saveStep2,
  saveStep3,
  setCompanyLogo,
  setBankProof,
  setFinalDoc,
  submitForm,
  resetForm,
} = vendorSlice.actions;

export default vendorSlice.reducer;