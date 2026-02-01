import type { AutoProp } from './types/prop&substep';
import type { AutoData, AutoEntity } from '@/ApplicationWizard/types/wizard';

interface SubstepData {
  propToChange: AutoProp;
  searchHeader: string;
  searchPlaceholder: string;
  listKey: string;
  loadingKey: string;
  getButtonLabel: (auto: AutoData) => string;
  isShowable?: (auto: AutoData) => boolean;
}

export const SUBSTEP_CONFIG: SubstepData[] = [
  {
    propToChange: 'brand',
    searchHeader: 'Выберите марку',
    searchPlaceholder: 'Например, BMW',
    listKey: 'brands',
    loadingKey: 'brandsAreLoading',
    getButtonLabel: (auto: AutoData) =>
      auto.brand ? `Марка: ${auto.brand.name}` : 'Выбрать марку',
  },
  {
    propToChange: 'model',
    searchHeader: 'Выберите модель',
    searchPlaceholder: 'Например, X5',
    getButtonLabel: (auto: AutoData) =>
      auto.model ? `Модель: ${auto.model.name}` : 'Выбрать модель',
    isShowable: (auto: AutoData) => !!auto.brand,
  },
  {
    field: 'generation' as const,
    header: 'Выберите поколение',
    placeholder: 'Например, F15',
    getLabel: (data: WizardData) =>
      data.generation ? `Поколение: ${data.generation.name}` : 'Выбрать поколение',
    showIf: (data: WizardData) => !!data.model,
  },
  {
    field: 'configuration' as const,
    header: 'Выберите конфигурацию',
    placeholder: 'Например, кроссовер',
    getLabel: (data: WizardData) =>
      data.configuration ? `Конфигурация: ${data.configuration.name}` : 'Выбрать конфигурацию',
    showIf: (data: WizardData) => !!data.generation,
  },
  // {
  //   field: 'modification' as const,
  //   header: 'Выберите модификацию',
  //   placeholder: 'Например, ...',
  //   getLabel: (data: WizardData) =>
  //     data.modification
  //       ? `Модификация: ${data.modification.name}`
  //       : 'Выберите модификацию',
  //   showIf: (data: WizardData) => !!data.configuration,
  // },
  {
    field: 'bodyType' as const,
    header: 'Выберите тип кузова',
    placeholder: 'Например, кроссовер',
    getLabel: (data: WizardData) =>
      data.bodyType ? `Тип кузова: ${data.bodyType.name}` : 'Выбрать тип кузова',
    showIf: (data: WizardData) => !data.generation,
  },
  {
    field: 'engineType' as const,
    header: 'Выберите тип двигателя',
    placeholder: 'Например, бензиновый',
    getLabel: (data: WizardData) =>
      data.engineType ? `Тип двигателя: ${data.engineType.name}` : 'Выбрать тип двигателя',
  },
  {
    field: 'gearType' as const,
    header: 'Выберите тип привода',
    placeholder: 'Например, передний',
    getLabel: (data: WizardData) =>
      data.gearType ? `Тип привода: ${data.gearType.name}` : 'Выбрать тип привода',
  },
  {
    field: 'transmission' as const,
    header: 'Выберите коробку',
    placeholder: 'Например, робот',
    getLabel: (data: WizardData) =>
      data.transmission ? `Коробка: ${data.transmission.name}` : 'Выбрать коробку',
  },
];
