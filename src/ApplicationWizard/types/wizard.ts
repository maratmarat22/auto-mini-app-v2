export type Brand = {
  id: string;
  name: string;
};

export type Model = {
  id: string;
  name: string;
};

export type Generation = {
  id: string;
  name: string;
};

export type Configuration = {
  id: string;
  name: string;
};

export type BodyType = {
  id: string;
  name: string;
};

export interface WizardData {
  brand: Brand | null;
  model: Model | null;
  generation: Generation | null;
  configuration: Configuration | null;

  bodyType: BodyType | null;
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
