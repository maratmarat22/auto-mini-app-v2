import type { WizardData } from '../types/wizard';

interface StepData {
  id: number;
  label: string;
  backButtonText: string | null;
  nextButtonText: string;
  isValid: (data: WizardData) => boolean;
}

const DEFAULT_STEP: Required<
  Pick<StepData, 'backButtonText' | 'nextButtonText' | 'isValid'>
> = {
  backButtonText: 'Назад',
  nextButtonText: 'Далее',
  isValid: (_: WizardData) => true,
};

export const STEPS_CONFIG: StepData[] = [
  {
    ...DEFAULT_STEP,
    id: 1,
    label: 'Старт',
    backButtonText: null,
    nextButtonText: 'Создать заявку',
  },
  {
    ...DEFAULT_STEP,
    id: 2,
    label: 'Авто',
    isValid: (data: WizardData) => !!data.brand,
  },
  {
    ...DEFAULT_STEP,
    id: 3,
    label: 'Бюджет',
  },
  {
    ...DEFAULT_STEP,
    id: 4,
    label: 'Отправка',
    backButtonText: 'Назад',
    nextButtonText: 'Отправить',
  },
];
