import { api } from '@/api/instance';

interface Brand {
  id: string;
  name: string;
}

export const autoApi = {
  getBrands: () => api.get<Brand[]>('/brands').then((res) => res.data),
  getModels: (brandId: string) =>
    api.get<string[]>(`/models?brandId=${brandId}`),
};
