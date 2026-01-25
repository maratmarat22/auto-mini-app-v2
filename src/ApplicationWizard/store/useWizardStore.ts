import { create } from 'zustand';

import type { WizardStore } from '@/ApplicationWizard/types/wizard';

export const useWizardStore = create<WizardStore>((set) => ({
  step: 1,
  data: {
    budget: 0,
    brand: null,
    model: null,
  },

  setStep: (step) => set({ step }),

  nextStep: () =>
    set((state) => ({
      step: Math.min(state.step + 1, 3),
    })),

  prevStep: () =>
    set((state) => ({
      step: Math.max(state.step - 1, 1),
    })),

  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),

  reset: () =>
    set({
      step: 1,
      data: { budget: 0, brand: null, model: null },
    }),
}));
