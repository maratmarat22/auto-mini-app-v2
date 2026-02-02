import { api } from '@/api/instance';

import { type AutoEntity } from '../types/wizard';

export const autoApi = {
  getBrands: ({ bodyTypeId }: { bodyTypeId: string | undefined }) =>
    api
      .get<AutoEntity[]>('brands', { params: { bodyTypeId: bodyTypeId } })
      .then((res) => res.data),

  getModels: ({ brandId }: { brandId: string | undefined }) =>
    api
      .get<AutoEntity[]>('models', { params: { brandId: brandId } })
      .then((res) => res.data),

  getGenerations: ({ modelId }: { modelId: string | undefined }) =>
    api
      .get<AutoEntity[]>('generations', { params: { modelId: modelId } })
      .then((res) => res.data),

  getConfigurations: ({ generationId }: { generationId: string | undefined }) =>
    api
      .get<
        AutoEntity[]
      >('configurations', { params: { generationId: generationId } })
      .then((res) => res.data),

  getModifications: ({
    configurationId,
  }: {
    configurationId: string | undefined;
  }) =>
    api
      .get<
        AutoEntity[]
      >('modifications', { params: { configurationId: configurationId } })
      .then((res) => res.data),

  getBodyTypes: () =>
    api.get<AutoEntity[]>('body-types').then((res) => res.data),

  getEngineTypes: () =>
    api.get<AutoEntity[]>('engine-types').then((res) => res.data),

  getGearTypes: () =>
    api.get<AutoEntity[]>('gear-types').then((res) => res.data),

  getTransmissions: () =>
    api.get<AutoEntity[]>('transmissions').then((res) => res.data),

  postApplication: () => api.post('applications'),
};
