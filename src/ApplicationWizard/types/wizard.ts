type Brand = {
  id: string;
  name: string;
};

type Model = {
  id: string;
  name: string;
};

export interface WizardData {
  brand: Brand | null;
  model: Model | null;
  bodyType: string | null;

  budget: number;
}

export interface WizardStore {
  step: number;
  onSubstep: boolean;
  data: WizardData;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<WizardData>) => void;
  setOnSubstep: (onSubstep: boolean) => void;
}
