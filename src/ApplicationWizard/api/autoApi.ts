import { api } from '@/api/instance';

import {
  type Generation,
  type Brand,
  type Model,
  type BodyType,
  type Configuration,
} from '../types/wizard';

export const autoApi = {
  getBrands: ({ bodyTypeId }: { bodyTypeId?: string }) =>
    api
      .get<Brand[]>('brands', { params: { bodyTypeId: bodyTypeId } })
      .then((res) => res.data),
  getModels: ({
    brandId,
    bodyTypeId,
  }: {
    brandId: string;
    bodyTypeId?: string;
  }) =>
    api
      .get<Model[]>('models', {
        params: { brandId: brandId, bodyTypeId: bodyTypeId },
      })
      .then((res) => res.data),
  getGenerations: ({
    modelId,
    bodyTypeId,
  }: {
    modelId: string;
    bodyTypeId?: string;
  }) =>
    api
      .get<
        Generation[]
      >('generations', { params: { modelId: modelId, bodyTypeId: bodyTypeId } })
      .then((res) => res.data),
  getConfigurations: ({ generationId }: { generationId: string }) =>
    api
      .get<Configuration[]>('configurations', {
        params: { generationId: generationId },
      })
      .then((res) => res.data),
  getBodyTypes: () => api.get<BodyType[]>('body-types').then((res) => res.data),
  postApplication: () => api.post('applications'),
};
