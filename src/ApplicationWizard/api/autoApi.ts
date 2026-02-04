import { api } from '@/api/instance';

import { type AutoData, type AutoEntity } from '../types/wizard';

const extractQueryParams: (data: AutoData) => Record<string, string> = (
  data: AutoData,
) => {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && 'id' in value) {
      params[`${key}Id`] = (value as AutoEntity).id;
    }
  }

  console.log(JSON.parse(JSON.stringify(params)));
  return params;
};

export const autoApi = {
  getBrands: (data: AutoData) =>
    api
      .get<AutoEntity[]>('brands', { params: extractQueryParams(data) })
      .then((res) => res.data),

  getModels: (data: AutoData) =>
    api
      .get<AutoEntity[]>('models', { params: extractQueryParams(data) })
      .then((res) => res.data),

  getGenerations: (data: AutoData) =>
    api
      .get<AutoEntity[]>('generations', { params: extractQueryParams(data) })
      .then((res) => res.data),

  getConfigurations: (data: AutoData) =>
    api
      .get<AutoEntity[]>('configurations', { params: extractQueryParams(data) })
      .then((res) => res.data),

  getModifications: (data: AutoData) =>
    api
      .get<AutoEntity[]>('modifications', { params: extractQueryParams(data) })
      .then((res) => res.data),

  getBodyTypes: (data: AutoData) =>
    api
      .get<AutoEntity[]>('body-types', { params: extractQueryParams(data) })
      .then((res) => res.data),

  getEngineTypes: (data: AutoData) =>
    api
      .get<AutoEntity[]>('engine-types', { params: extractQueryParams(data) })
      .then((res) => res.data),

  getGearTypes: () =>
    api.get<AutoEntity[]>('gear-types').then((res) => res.data),

  getTransmissions: () =>
    api.get<AutoEntity[]>('transmissions').then((res) => res.data),

  postApplication: () => api.post('applications'),
};
