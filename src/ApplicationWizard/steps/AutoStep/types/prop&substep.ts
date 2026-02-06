import type {
  AbstractAutoData,
  SpecificAutoData,
} from '@/ApplicationWizard/types/wizardStore';

export type SpecificAutoDataProp = keyof SpecificAutoData;

export type SelectableAutoDataProp =
  | keyof SpecificAutoData
  | Extract<keyof AbstractAutoData, 'bodyType'>;

// export type InputtableAutoProp = Extract<
//   keyof SpecificAutoData,
//   'displacementFrom' | 'displacementTo'
// >;

export type AutoSubstep = SelectableAutoDataProp | null;
