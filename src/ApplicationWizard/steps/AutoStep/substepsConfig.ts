import type { AutoProp } from './types/prop&substep';
import type { AutoData } from '@/ApplicationWizard/types/wizard';

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
    listKey: 'models',
    loadingKey: 'modelsAreLoading',
    getButtonLabel: (auto: AutoData) =>
      auto.model ? `Модель: ${auto.model.name}` : 'Выбрать модель',
    isShowable: (auto: AutoData) => !!auto.brand,
  },
  {
    propToChange: 'generation',
    searchHeader: 'Выберите поколение',
    searchPlaceholder: 'Например, X5',
    listKey: 'generations',
    loadingKey: 'generationsAreLoading',
    getButtonLabel: (auto: AutoData) =>
      auto.generation
        ? `Поколение: ${auto.generation.name}`
        : 'Выбрать поколение',
    isShowable: (auto: AutoData) => !!auto.model,
  },
  {
    propToChange: 'configuration',
    searchHeader: 'Выберите конфигурацию',
    searchPlaceholder: 'Например, кроссовер',
    listKey: 'configurations',
    loadingKey: 'configurationsAreLoading',
    getButtonLabel: (auto: AutoData) =>
      auto.configuration
        ? `Конфигурация: ${auto.configuration.name}`
        : 'Выбрать конфигурацию',
    isShowable: (auto: AutoData) => !!auto.generation,
  },
  {
    propToChange: 'modification',
    searchHeader: 'Выберите модификацию',
    searchPlaceholder: 'Например, ...',
    listKey: 'modifications',
    loadingKey: 'modificationsAreLoading',
    getButtonLabel: (auto: AutoData) =>
      auto.modification
        ? `Модификация: ${auto.modification.name}`
        : 'Выбрать модификацию',
    isShowable: (auto: AutoData) => !!auto.configuration,
  },
  {
    propToChange: 'bodyType',
    searchHeader: 'Выберите тип кузова',
    searchPlaceholder: 'Например, кроссовер',
    listKey: 'bodyTypes',
    loadingKey: 'bodyTypesAreLoading',
    getButtonLabel: (auto: AutoData) =>
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
    getButtonLabel: (auto: AutoData) =>
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
    getButtonLabel: (auto: AutoData) =>
      auto.gearType ? `Привод: ${auto.gearType.name}` : 'Выбрать привод',
  },
  {
    propToChange: 'transmission',
    searchHeader: 'Выберите коробку',
    searchPlaceholder: 'Например, робот',
    listKey: 'transmissions',
    loadingKey: 'transmissionsAreLoading',
    getButtonLabel: (auto: AutoData) =>
      auto.transmission
        ? `Коробка: ${auto.transmission.name}`
        : 'Выбрать коробку',
  },
];
