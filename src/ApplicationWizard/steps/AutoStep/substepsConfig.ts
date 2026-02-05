import type {
  SelectableAutoProp,
  InputtableAutoProp,
} from './types/prop&substep';
import type { AutoData } from '@/ApplicationWizard/types/wizard';

interface BaseSubstepConfig {
  group: 'main' | 'specs';
  getButtonLabel: (auto: AutoData) => string;
  isVisible?: (auto: AutoData) => boolean;
}

export interface RangeInputSubstepConfig extends BaseSubstepConfig {
  fromProp: InputtableAutoProp;
  toProp: InputtableAutoProp;
  fromPlaceholder: string;
  toPlaceholder: string;
}

export interface SelectSubstepConfig extends BaseSubstepConfig {
  prop: SelectableAutoProp;
  searchHeader: string;
  searchPlaceholder: string;
  listKey: string;
  loadingKey: string;
}

export const SUBSTEPS_CONFIG: (
  | SelectSubstepConfig
  | RangeInputSubstepConfig
)[] = [
  {
    group: 'main',
    prop: 'brand',
    searchHeader: 'Выберите марку',
    searchPlaceholder: 'Например, BMW',
    listKey: 'brands',
    loadingKey: 'brandsAreLoading',
    getButtonLabel: (auto) =>
      auto.brand ? `Марка: ${auto.brand.name}` : 'Выбрать марку',
  },
  {
    group: 'main',
    prop: 'model',
    searchHeader: 'Выберите модель',
    searchPlaceholder: 'Например, X5',
    listKey: 'models',
    loadingKey: 'modelsAreLoading',
    getButtonLabel: (auto) =>
      auto.model ? `Модель: ${auto.model.name}` : 'Выбрать модель',
    isVisible: (auto) => !!auto.brand,
  },
  {
    group: 'main',
    prop: 'generation',
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
    group: 'main',
    prop: 'configuration',
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
    group: 'main',
    prop: 'modification',
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

  {
    group: 'specs',
    prop: 'bodyType',
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
    group: 'specs',
    prop: 'engineType',
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
    group: 'specs',
    fromProp: 'displacementFrom',
    toProp: 'displacementTo',
    fromPlaceholder: 'a',
    toPlaceholder: 'b',
    getButtonLabel: (auto: AutoData) =>
      auto.displacementFrom || auto.displacementTo
        ? `${auto.displacementFrom} — ${auto.displacementTo}`
        : 'Выбрать объём двигателя',
    isVisible: (auto: AutoData) => !!auto.engineType,
  },
  {
    group: 'specs',
    prop: 'gearType',
    searchHeader: 'Выберите привод',
    searchPlaceholder: 'Например, передний',
    listKey: 'gearTypes',
    loadingKey: 'gearTypesAreLoading',
    getButtonLabel: (auto) =>
      auto.gearType ? `Привод: ${auto.gearType.name}` : 'Выбрать привод',
  },
  {
    group: 'specs',
    prop: 'transmission',
    searchHeader: 'Выберите коробку',
    searchPlaceholder: 'Например, робот',
    listKey: 'transmissions',
    loadingKey: 'transmissionsAreLoading',
    getButtonLabel: (auto) =>
      auto.transmission
        ? `Коробка: ${auto.transmission.name}`
        : 'Выбрать коробку',
  },
];
