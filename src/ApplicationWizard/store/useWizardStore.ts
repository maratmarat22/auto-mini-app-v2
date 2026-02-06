import { create } from 'zustand';

import { handleClose } from '@/main';

import { autoApi } from '../api/autoApi';
import { STEPS_CONFIG } from '../steps/stepsConfig';

import type { WizardStore } from '@/ApplicationWizard/types/wizardStore';

export const useWizardStore = create<WizardStore>((set, get) => ({
  submitPending: false,
  submitSuccessful: false,
  step: 1,
  onSubstep: false,
  onModal: false,
  application: {
    budget: 0,
    city: null,
    comment: null,
    specificAutoData: {
      brand: null,
      model: null,
      generation: null,
      configuration: null,
      modification: null,
    },
    abstractAutoData: {
      bodyType: null,
      engineType: null,
      gearType: null,
      transmission: null,
      displacementFrom: null,
      displacementTo: null,
    },
  },

  setStep: (step) => set({ step }),

  handleNextStep: async () => {
    const state = get();

    if (state.onModal) {
      return set({ onModal: false });
    }

    if (state.step === STEPS_CONFIG.length - 1) {
      try {
        set({ submitPending: true });
        await autoApi.postApplication();
        set({ submitSuccessful: true });
      } catch (error) {
        set({ submitSuccessful: false });
        console.error(error);
      } finally {
        set({ submitPending: false });
      }
    } else if (state.step === STEPS_CONFIG.length) {
      handleClose();
    }
    set((state) => ({
      onSubstep: false,
      step: Math.min(state.step + 1, STEPS_CONFIG.length),
    }));
  },

  handlePrevStep: () => {
    const state = get();
    if (state.step === STEPS_CONFIG.length && state.submitSuccessful) {
      state.reset();
      state.setStep(2);
      return;
    }
    set((state) => {
      if (state.onSubstep) {
        return { onSubstep: false };
      }
      return {
        step: Math.max(state.step - 1, 1),
      };
    });
  },

  updateData: (newData) =>
    set((state) => ({ application: { ...state.application, ...newData } })),

  setOnSubstep: (onSubstep: boolean) => set({ onSubstep: onSubstep }),
  setOnModal: (onModal: boolean) => set({ onModal: onModal }),

  reset: () =>
    set({
      submitPending: false,
      submitSuccessful: false,
      step: 1,
      onSubstep: false,
      onModal: false,
      application: {
        budget: 0,
        city: null,
        comment: null,
        specificAutoData: {
          brand: null,
          model: null,
          generation: null,
          configuration: null,
          modification: null,
        },
        abstractAutoData: {
          bodyType: null,
          engineType: null,
          gearType: null,
          transmission: null,
          displacementFrom: null,
          displacementTo: null,
        },
      },
    }),
}));
