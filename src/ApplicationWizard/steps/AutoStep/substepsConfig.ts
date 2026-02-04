import type { AutoProp } from './types/prop&substep';
import type { AutoData } from '@/ApplicationWizard/types/wizard';

export interface SubstepData {
  propToChange: AutoProp;
  searchHeader: string;
  searchPlaceholder: string;
  listKey: string;
  loadingKey: string;
  getButtonLabel: (auto: AutoData) => string;
  isVisible?: (auto: AutoData) => boolean;
}

interface SubstepGroup {
  id: 'specific' | 'abstract';
  title: string;
  configs: SubstepData[];
}

export const SUBSTEP_CONFIG: SubstepGroup[] = [
  {
    id: 'specific',
    title: 'Основная информация',
    configs: [
      {
        propToChange: 'brand',
        searchHeader: 'Выберите марку',
        searchPlaceholder: 'Например, BMW',
        listKey: 'brands',
        loadingKey: 'brandsAreLoading',
        getButtonLabel: (auto) =>
          auto.brand ? `Марка: ${auto.brand.name}` : 'Выбрать марку',
      },
      {
        propToChange: 'model',
        searchHeader: 'Выберите модель',
        searchPlaceholder: 'Например, X5',
        listKey: 'models',
        loadingKey: 'modelsAreLoading',
        getButtonLabel: (auto) =>
          auto.model ? `Модель: ${auto.model.name}` : 'Выбрать модель',
        isVisible: (auto) => !!auto.brand,
      },
      {
        propToChange: 'generation',
        searchHeader: 'Выберите поколение',
        searchPlaceholder: 'Например, X5',
        listKey: 'generations',
        loadingKey: 'generationsAreLoading',
        getButtonLabel: (auto) =>
          auto.generation
            ? `Поколение: ${auto.generation.name}`
            : 'Выбрать поколение',
        isVisible: (auto) => !!auto.model,
      },
      {
        propToChange: 'configuration',
        searchHeader: 'Выберите конфигурацию',
        searchPlaceholder: 'Например, кроссовер',
        listKey: 'configurations',
        loadingKey: 'configurationsAreLoading',
        getButtonLabel: (auto) =>
          auto.configuration
            ? `Конфигурация: ${auto.configuration.name}`
            : 'Выбрать конфигурацию',
        isVisible: (auto) => !!auto.generation,
      },
      {
        propToChange: 'modification',
        searchHeader: 'Выберите модификацию',
        searchPlaceholder: 'Например, ...',
        listKey: 'modifications',
        loadingKey: 'modificationsAreLoading',
        getButtonLabel: (auto) =>
          auto.modification
            ? `Модификация: ${auto.modification.name}`
            : 'Выбрать модификацию',
        isVisible: (auto) => !!auto.configuration,
      },
    ],
  },
  {
    id: 'abstract',
    title: 'Характеристики',
    configs: [
      {
        propToChange: 'bodyType',
        searchHeader: 'Выберите тип кузова',
        searchPlaceholder: 'Например, кроссовер',
        listKey: 'bodyTypes',
        loadingKey: 'bodyTypesAreLoading',
        getButtonLabel: (auto) =>
          auto.bodyType
            ? `Тип кузова: ${auto.bodyType.name}`
            : 'Выбрать тип кузова',
      },
      {
        propToChange: 'engineType',
        searchHeader: 'Выберите тип двигателя',
        searchPlaceholder: 'Например, ГБО',
        listKey: 'engineTypes',
        loadingKey: 'engineTypesAreLoading',
        getButtonLabel: (auto) =>
          auto.engineType
            ? `Тип двигателя: ${auto.engineType.name}`
            : 'Выбрать тип двигателя',
      },
      {
        propToChange: 'gearType',
        searchHeader: 'Выберите привод',
        searchPlaceholder: 'Например, передний',
        listKey: 'gearTypes',
        loadingKey: 'gearTypesAreLoading',
        getButtonLabel: (auto) =>
          auto.gearType ? `Привод: ${auto.gearType.name}` : 'Выбрать привод',
      },
      {
        propToChange: 'transmission',
        searchHeader: 'Выберите коробку',
        searchPlaceholder: 'Например, робот',
        listKey: 'transmissions',
        loadingKey: 'transmissionsAreLoading',
        getButtonLabel: (auto) =>
          auto.transmission
            ? `Коробка: ${auto.transmission.name}`
            : 'Выбрать коробку',
      },
    ],
  },
];
