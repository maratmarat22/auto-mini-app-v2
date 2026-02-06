import { api } from '@/api/instance';

import { type AutoEntity } from '../types/wizardStore';

export const autoApi = {
  getBrands: () => api.get<AutoEntity[]>('brands').then((res) => res.data),

  getModels: (brandId: string) =>
    api
      .get<AutoEntity[]>('models', { params: { brandId: brandId } })
      .then((res) => res.data),

  getGenerations: (modelId: string) =>
    api
      .get<AutoEntity[]>('generations', { params: { modelId: modelId } })
      .then((res) => res.data),

  getConfigurations: (generationId: string) =>
    api
      .get<
        AutoEntity[]
      >('configurations', { params: { generationId: generationId } })
      .then((res) => res.data),

  getModifications: (configurationId: string) =>
    api
      .get<
        AutoEntity[]
      >('modifications', { params: { configurationId: configurationId } })
      .then((res) => res.data),

  // getBodyTypes: (data: AutoData) =>
  //   api
  //     .get<AutoEntity[]>('body-types', { params: extractQueryParams(data) })
  //     .then((res) => res.data),

  // getEngineTypes: (data: AutoData) =>
  //   api
  //     .get<AutoEntity[]>('engine-types', { params: extractQueryParams(data) })
  //     .then((res) => res.data),

  // getGearTypes: (data: AutoData) =>
  //   api
  //     .get<AutoEntity[]>('gear-types', { params: extractQueryParams(data) })
  //     .then((res) => res.data),

  // getTransmissions: (data: AutoData) =>
  //   api
  //     .get<AutoEntity[]>('transmissions', { params: extractQueryParams(data) })
  //     .then((res) => res.data),

  postApplication: () => api.post('applications'),
};
