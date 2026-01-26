import type { WizardData } from '../types/wizard';

interface StepData {
  id: number;
  label: string;
  backButtonText: string | null;
  nextButtonText: string;
  isValid?: (data: WizardData) => boolean;
}

export const STEPS_CONFIG: StepData[] = [
  {
    id: 1,
    label: 'Старт',
    backButtonText: null,
    nextButtonText: 'Создать заявку',
  },
  {
    id: 2,
    label: 'Авто',
    backButtonText: 'Назад',
    nextButtonText: 'Далее',
    isValid: (data: WizardData) => !!data.brand,
  },
  { id: 3, label: 'Бюджет', backButtonText: 'Назад', nextButtonText: 'Далее' },
];
