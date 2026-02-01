import type { AutoData } from '@/ApplicationWizard/types/wizard';

export type AutoProp = keyof AutoData;

export type AutoSubstep = AutoProp | null;
