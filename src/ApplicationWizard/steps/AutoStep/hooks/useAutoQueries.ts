import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { autoApi } from '@/ApplicationWizard/api/getAutoInfo';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

// hooks/useAutoData.ts
export const useAutoQueries = () => {
  const { data: wizardData, updateData } = useWizardStore();

  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });

  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: ['models', wizardData.brand?.id],
    queryFn: () => autoApi.getModels(wizardData.brand!.id),
    enabled: !!wizardData.brand,
  });

  const { data: generations, isLoading: generationsAreLoading } = useQuery({
    queryKey: ['generations', wizardData.model?.id],
    queryFn: () => autoApi.getGenerations(wizardData.model!.id),
    enabled: !!wizardData.model,
  });

  const { data: bodyTypes, isLoading: bodyTypesAreLoading } = useQuery({
    queryKey: ['body-types'],
    queryFn: autoApi.getBodyTypes,
  });

  // Автовыбор если элемент один
  useEffect(() => {
    if (models?.length === 1 && !modelsAreLoading) {
      updateData({ model: models[0], generation: null });
    }
  }, [models, modelsAreLoading, updateData]);

  useEffect(() => {
    if (generations?.length === 1 && !generationsAreLoading) {
      updateData({ generation: generations[0] });
    }
  }, [generations, generationsAreLoading, updateData]);

  return {
    brands,
    brandsAreLoading,
    models,
    modelsAreLoading,
    generations,
    generationsAreLoading,
    bodyTypes,
    bodyTypesAreLoading,
  };
};
