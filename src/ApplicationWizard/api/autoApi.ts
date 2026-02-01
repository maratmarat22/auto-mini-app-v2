import { api } from '@/api/instance';

import { type AutoData, type AutoEntity } from '../types/wizard';

const formatAutoDataIntoParams = (auto: AutoData) => {
  console.log('SSSSSSSSSSSSSSSSSSSSSSSS' + auto.bodyType);
  return Object.entries(auto).reduce(
    (acc, [key, value]) => {
      // Если это объект с id (наш NamedEntity), берем id
      if (value && typeof value === 'object' && 'id' in value) {
        acc[`${key}Id`] = value.id;
      }
      // Если это просто строка или число, берем как есть
      else if (value !== null) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

export const autoApi = {
  getBrands: (auto: AutoData) =>
    api
      .get<AutoEntity[]>('brands', { params: formatAutoDataIntoParams(auto) })
      .then((res) => res.data),

  getModels: (params: Partial<AutoData>) =>
    api.get<AutoEntity[]>('models', { params }).then((res) => res.data),

  getGenerations: (params: Partial<AutoData>) =>
    api.get<AutoEntity[]>('generations', { params }).then((res) => res.data),

  getConfigurations: (params: Partial<AutoData>) =>
    api.get<AutoEntity[]>('configurations', { params }).then((res) => res.data),

  getBodyTypes: (auto: AutoData) =>
    api
      .get<AutoEntity[]>('body-types', { params: formatAutoDataIntoParams(auto) })
      .then((res) => res.data),

  getEngineTypes: (params: Partial<AutoData>) =>
    api.get<AutoEntity[]>('engine-types', { params }).then((res) => res.data),

  getGearTypes: (params: Partial<AutoData>) =>
    api.get<AutoEntity[]>('gear-types', { params }).then((res) => res.data),

  getTransmissions: (params: Partial<AutoData>) =>
    api.get<AutoEntity[]>('transmissions', { params }).then((res) => res.data),

  postApplication: () => api.post('applications'),
};
