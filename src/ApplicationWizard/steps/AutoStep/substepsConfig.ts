import type {} from './types/prop&substep';
import type { SpecificAutoData } from '@/ApplicationWizard/types/wizardStore';

export interface SpecificSubstepConfig {
  prop: keyof SpecificAutoData;
  listKey: string;
  loadingKey: string;
  searchPlaceholder: string;
  searchHeader: string;
  getButtonLabel: (auto: SpecificAutoData) => string;
  disabled?: (auto: SpecificAutoData) => boolean;
}

export const SPECIFIC_SUBSTEP_CONFIGS: SpecificSubstepConfig[] = [
  {
    prop: 'brand',
    listKey: 'brands',
    loadingKey: 'brandsAreLoading',
    searchPlaceholder: 'Например, BMW',
    searchHeader: 'Выберите марку из списка',
    getButtonLabel: (auto: SpecificAutoData) =>
      auto.brand ? `Марка: ${auto.brand.name}` : 'Уточнить марку',
  },
  {
    prop: 'model',
    listKey: 'models',
    loadingKey: 'modelsAreLoading',
    searchPlaceholder: 'Например, X5',
    searchHeader: 'Выберите модель из списка',
    getButtonLabel: (auto) =>
      auto.model ? `Модель: ${auto.model.name}` : 'Уточнить модель',
    disabled: (auto) => !auto.brand,
  },
  {
    prop: 'generation',
    listKey: 'generations',
    loadingKey: 'generationsAreLoading',
    searchPlaceholder: 'Например, ...',
    searchHeader: 'Выберите поколение из списка',
    getButtonLabel: (auto) =>
      auto.generation
        ? `Поколение: ${auto.generation.name}`
        : 'Уточнить поколение',
    disabled: (auto) => !auto.model,
  },
  {
    prop: 'configuration',
    listKey: 'configurations',
    loadingKey: 'configurationsAreLoading',
    searchPlaceholder: 'Например, ...',
    searchHeader: 'Выберите конфигурацию из списка',
    getButtonLabel: (auto) =>
      auto.configuration
        ? `Конф.: ${auto.configuration.name}`
        : 'Уточнить конфигурацию',
    disabled: (auto) => !auto.generation,
  },
  {
    prop: 'modification',
    listKey: 'modifications',
    loadingKey: 'modificationsAreLoading',
    searchPlaceholder: 'Например, ...',
    searchHeader: 'Выберите модификацию из списка',
    getButtonLabel: (auto) =>
      auto.modification
        ? `Мод.: ${auto.modification.name}`
        : 'Уточнить модификацию',
    disabled: (auto) => !auto.configuration,
  },
];

// interface BaseSubstepConfig {
//   group: 'main' | 'specs';
//   getButtonLabel: (auto: SpecificAutoData) => string;
//   isVisible?: (auto: SpecificAutoData) => boolean;
// }

// export interface RangeInputSubstepConfig extends BaseSubstepConfig {
//   fromProp: InputtableAutoProp;
//   toProp: InputtableAutoProp;
//   fromPlaceholder: string;
//   toPlaceholder: string;
// }

// export interface SelectSubstepConfig extends BaseSubstepConfig {
//   prop: SelectableAutoDataProp;
//   searchHeader: string;
//   searchPlaceholder: string;
//   listKey: string;
//   loadingKey: string;
// }

// export const SUBSTEPS_CONFIG: (
//   | SelectSubstepConfig
//   | RangeInputSubstepConfig
// )[] = [
//   {
//     group: 'main',
//     prop: 'brand',
//     searchHeader: 'Выберите марку',
//     searchPlaceholder: 'Например, BMW',
//     listKey: 'brands',
//     loadingKey: 'brandsAreLoading',
//     getButtonLabel: (auto) =>
//       auto.brand ? `Марка: ${auto.brand.name}` : 'Выбрать марку',
//   },
//   {
//     group: 'main',
//     prop: 'model',
//     searchHeader: 'Выберите модель',
//     searchPlaceholder: 'Например, X5',
//     listKey: 'models',
//     loadingKey: 'modelsAreLoading',
//     getButtonLabel: (auto) =>
//       auto.model ? `Модель: ${auto.model.name}` : 'Выбрать модель',
//     isVisible: (auto) => !!auto.brand,
//   },
//   {
//     group: 'main',
//     prop: 'generation',
//     searchHeader: 'Выберите поколение',
//     searchPlaceholder: 'Например, X5',
//     listKey: 'generations',
//     loadingKey: 'generationsAreLoading',
//     getButtonLabel: (auto) =>
//       auto.generation
//         ? `Поколение: ${auto.generation.name}`
//         : 'Выбрать поколение',
//     isVisible: (auto) => !!auto.model,
//   },
//   {
//     group: 'main',
//     prop: 'configuration',
//     searchHeader: 'Выберите конфигурацию',
//     searchPlaceholder: 'Например, кроссовер',
//     listKey: 'configurations',
//     loadingKey: 'configurationsAreLoading',
//     getButtonLabel: (auto) =>
//       auto.configuration
//         ? `Конфигурация: ${auto.configuration.name}`
//         : 'Выбрать конфигурацию',
//     isVisible: (auto) => !!auto.generation,
//   },
//   {
//     group: 'main',
//     prop: 'modification',
//     searchHeader: 'Выберите модификацию',
//     searchPlaceholder: 'Например, ...',
//     listKey: 'modifications',
//     loadingKey: 'modificationsAreLoading',
//     getButtonLabel: (auto) =>
//       auto.modification
//         ? `Модификация: ${auto.modification.name}`
//         : 'Выбрать модификацию',
//     isVisible: (auto) => !!auto.configuration,
//   },

//   {
//     group: 'specs',
//     prop: 'bodyType',
//     searchHeader: 'Выберите тип кузова',
//     searchPlaceholder: 'Например, кроссовер',
//     listKey: 'bodyTypes',
//     loadingKey: 'bodyTypesAreLoading',
//     getButtonLabel: (auto) =>
//       auto.bodyType
//         ? `Тип кузова: ${auto.bodyType.name}`
//         : 'Выбрать тип кузова',
//   },
//   {
//     group: 'specs',
//     prop: 'engineType',
//     searchHeader: 'Выберите тип двигателя',
//     searchPlaceholder: 'Например, ГБО',
//     listKey: 'engineTypes',
//     loadingKey: 'engineTypesAreLoading',
//     getButtonLabel: (auto) =>
//       auto.engineType
//         ? `Тип двигателя: ${auto.engineType.name}`
//         : 'Выбрать тип двигателя',
//   },
//   {
//     group: 'specs',
//     fromProp: 'displacementFrom',
//     toProp: 'displacementTo',
//     fromPlaceholder: 'a',
//     toPlaceholder: 'b',
//     getButtonLabel: (auto: SpecificAutoData) =>
//       auto.displacementFrom || auto.displacementTo
//         ? `${auto.displacementFrom} — ${auto.displacementTo}`
//         : 'Выбрать объём двигателя',
//     isVisible: (auto: SpecificAutoData) => !!auto.engineType,
//   },
//   {
//     group: 'specs',
//     prop: 'gearType',
//     searchHeader: 'Выберите привод',
//     searchPlaceholder: 'Например, передний',
//     listKey: 'gearTypes',
//     loadingKey: 'gearTypesAreLoading',
//     getButtonLabel: (auto) =>
//       auto.gearType ? `Привод: ${auto.gearType.name}` : 'Выбрать привод',
//   },
//   {
//     group: 'specs',
//     prop: 'transmission',
//     searchHeader: 'Выберите коробку',
//     searchPlaceholder: 'Например, робот',
//     listKey: 'transmissions',
//     loadingKey: 'transmissionsAreLoading',
//     getButtonLabel: (auto) =>
//       auto.transmission
//         ? `Коробка: ${auto.transmission.name}`
//         : 'Выбрать коробку',
//   },
// ];
