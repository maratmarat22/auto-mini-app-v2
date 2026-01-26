interface StepData {
  id: number;
  label: string;
  backButtonText: string | null;
  nextButtonText: string;
}

export const STEPS_CONFIG: StepData[] = [
  {
    id: 1,
    label: 'Старт',
    backButtonText: null,
    nextButtonText: 'Создать заявку',
  },
  { id: 2, label: 'Авто', backButtonText: 'Назад', nextButtonText: 'Далее' },
  { id: 3, label: 'Бюджет', backButtonText: 'Назад', nextButtonText: 'Далее' },
];
