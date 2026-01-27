import type { WizardData } from '@/ApplicationWizard/types/wizard';

export type AutoField = keyof Pick<
  WizardData,
  'brand' | 'model' | 'generation' | 'bodyType'
>;

export type AutoSubstep = AutoField | null;
