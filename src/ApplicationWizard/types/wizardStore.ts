export interface AutoEntity {
  id: string;
  name: string;
}

export interface SpecificAutoData {
  brand: AutoEntity | null;
  model: AutoEntity | null;
  generation: AutoEntity | null;
  configuration: AutoEntity | null;
  modification: AutoEntity | null;
}

export interface AbstractAutoData {
  bodyType: AutoEntity | null;
  engineType: AutoEntity | null;
  displacementFrom: number | null;
  displacementTo: number | null;

  gearType: AutoEntity | null;
  transmission: AutoEntity | null;
}

export interface ApplicationData {
  budget: number;
  city: AutoEntity | null;
  comment: string | null;
  specificAutoData: SpecificAutoData;
  abstractAutoData: AbstractAutoData;
}

export interface WizardStore {
  submitPending: boolean;
  submitSuccessful: boolean;
  step: number;
  onSubstep: boolean;
  onModal: boolean;
  application: ApplicationData;

  setStep: (step: number) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  updateData: (data: Partial<ApplicationData>) => void;
  setOnSubstep: (onSubstep: boolean) => void;
  setOnModal: (onModal: boolean) => void;
  reset: () => void;
}
