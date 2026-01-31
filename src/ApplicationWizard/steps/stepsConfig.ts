interface StepData {
  stepNumber: number;
  header: string;
  backButtonText: string | null;
  nextButtonText: string;
}

const DEFAULT_STEP: Required<
  Pick<StepData, 'backButtonText' | 'nextButtonText'>
> = {
  backButtonText: 'Назад',
  nextButtonText: 'Далее',
};

export const STEPS_CONFIG: StepData[] = [
  {
    ...DEFAULT_STEP,
    stepNumber: 1,
    header: 'Старт',
    backButtonText: null,
    nextButtonText: 'Создать заявку',
  },
  {
    ...DEFAULT_STEP,
    stepNumber: 2,
    header: 'Авто',
  },
  {
    ...DEFAULT_STEP,
    stepNumber: 3,
    header: 'Комментарий',
  },
  {
    ...DEFAULT_STEP,
    stepNumber: 4,
    header: 'Бюджет',
  },
  {
    ...DEFAULT_STEP,
    stepNumber: 5,
    header: 'Отправка',
    nextButtonText: 'Отправить',
  },
  {
    ...DEFAULT_STEP,
    stepNumber: 6,
    header: 'Результат',
    nextButtonText: 'Выйти',
  },
];
