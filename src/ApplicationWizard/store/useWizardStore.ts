import { create } from 'zustand';

import { STEPS_CONFIG } from '../steps/stepsConfig';

import type { WizardStore } from '@/ApplicationWizard/types/wizard';

export const useWizardStore = create<WizardStore>((set) => ({
  step: 1,
  onSubstep: false,
  data: {
    budget: 0,
    brand: null,
    model: null,
    bodyType: null,
    generation: null,
  },

  setStep: (step) => set({ step }),

  nextStep: () =>
    set((state) => ({
      onSubstep: false,
      step: Math.min(state.step + 1, STEPS_CONFIG.length),
    })),

  prevStep: () =>
    set((state) => {
      if (state.onSubstep) {
        return { onSubstep: false };
      }
      return {
        step: Math.max(state.step - 1, 1),
      };
    }),

  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),

  setOnSubstep: (onSubstep: boolean) => set({ onSubstep: onSubstep }),

  reset: () =>
    set({
      step: 1,
      onSubstep: false,
      data: {
        budget: 0,
        brand: null,
        model: null,
        bodyType: null,
        generation: null,
      },
    }),
}));
