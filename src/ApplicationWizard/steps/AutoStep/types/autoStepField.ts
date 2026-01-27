import type { WizardData } from '@/ApplicationWizard/types/wizard';

export type AutoStepField =
  | keyof Pick<WizardData, 'brand' | 'model' | 'generation'>
  | null;
