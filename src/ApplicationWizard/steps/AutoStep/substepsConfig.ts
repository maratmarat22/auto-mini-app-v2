import type { WizardData } from '@/ApplicationWizard/types/wizard';

export const SUBSTEP_CONFIG = [
  {
    field: 'brand' as const,
    header: 'Выберите марку',
    placeholder: 'Например, BMW',
    getLabel: (data: WizardData) =>
      data.brand ? `Марка: ${data.brand.name}` : 'Выберите марку',
  },
  {
    field: 'model' as const,
    header: 'Выберите модель',
    placeholder: 'Например, X5',
    getLabel: (data: WizardData) =>
      data.model ? `Модель: ${data.model.name}` : 'Выберите модель',
    showIf: (data: WizardData) => !!data.brand,
  },
  {
    field: 'generation' as const,
    header: 'Выберите поколение',
    placeholder: 'Например, F15',
    getLabel: (data: WizardData) =>
      data.generation
        ? `Поколение: ${data.generation.name}`
        : 'Выберите поколение',
    showIf: (data: WizardData) => !!data.model,
  },
  {
    field: 'configuration' as const,
    header: 'Выберите конфигурацию',
    placeholder: 'Например, кроссовер',
    getLabel: (data: WizardData) =>
      data.configuration
        ? `Конфигурация: ${data.configuration.name}`
        : 'Выберите конфигурацию',
    showIf: (data: WizardData) => !!data.generation,
  },
  {
    field: 'bodyType' as const,
    header: 'Выберите тип кузова',
    placeholder: 'Например, кроссовер',
    getLabel: (data: WizardData) =>
      data.bodyType
        ? `Тип кузова: ${data.bodyType.name}`
        : 'Выберите тип кузова',
    showIf: (data: WizardData) => !data.generation,
  },
];
