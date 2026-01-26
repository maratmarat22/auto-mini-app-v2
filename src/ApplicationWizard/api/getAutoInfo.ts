import { api } from '@/api/instance';

interface Brand {
  id: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
}

interface BodyType {
  id: number;
  name: string;
}

export const autoApi = {
  getBrands: () => api.get<Brand[]>('/brands').then((res) => res.data),
  getModels: (brandId: string) =>
    api.get<Model[]>(`/models?brandId=${brandId}`).then((res) => res.data),
  getBodyTypes: () =>
    api.get<BodyType[]>('/body-types').then((res) => res.data),
};
