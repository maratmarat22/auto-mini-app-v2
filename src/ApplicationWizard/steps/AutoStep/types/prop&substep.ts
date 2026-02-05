import type { AutoData } from '@/ApplicationWizard/types/wizard';

export type SelectableAutoProp = Exclude<
  keyof AutoData,
  'displacementFrom' | 'displacementTo'
>;

export type InputtableAutoProp = Extract<
  keyof AutoData,
  'displacementFrom' | 'displacementTo'
>;

export type AutoSubstep = SelectableAutoProp | null;
