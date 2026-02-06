export interface AutoEntity {
  id: string;
  name: string;
}

export interface AutoData {
  bodyType: AutoEntity | null;
  engineType: AutoEntity | null;
  displacementFrom: number | null;
  displacementTo: number | null;

  gearType: AutoEntity | null;
  transmission: AutoEntity | null;

  brand: AutoEntity | null;
  model: AutoEntity | null;
  generation: AutoEntity | null;
  configuration: AutoEntity | null;
  modification: AutoEntity | null;
}

export interface ApplicationData {
  budget: number;
  comment: string | null;
  auto: AutoData;
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
