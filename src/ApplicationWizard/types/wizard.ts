export interface WizardData {
  brand: string | null;
  model: string | null;
  bodyType: string | null;

  budget: number;
}

export interface WizardStore {
  step: number;
  data: WizardData;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<WizardData>) => void;
}
