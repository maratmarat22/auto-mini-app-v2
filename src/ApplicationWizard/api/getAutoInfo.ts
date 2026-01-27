import { api } from '@/api/instance';

import {
  type Generation,
  type Brand,
  type Model,
  type BodyType,
} from '../types/wizard';

export const autoApi = {
  getBrands: () => api.get<Brand[]>('/brands').then((res) => res.data),
  getModels: (brandId: string) =>
    api.get<Model[]>(`/models?brandId=${brandId}`).then((res) => res.data),
  getGenerations: (modelId: string) =>
    api
      .get<Generation[]>(`/generations?modelId=${modelId}`)
      .then((res) => res.data),
  getBodyTypes: () =>
    api.get<BodyType[]>('/body-types').then((res) => res.data),
};
