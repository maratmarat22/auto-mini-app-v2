import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { autoApi } from '@/ApplicationWizard/api/autoApi';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import type { AutoSubstep } from '../types/types';

export const useAutoQueries = (currentSubstep: AutoSubstep) => {
  const { data: wizardData, updateData } = useWizardStore();

  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: ['brands', wizardData.bodyType?.id],
    queryFn: () => {
      return autoApi.getBrands({ bodyTypeId: wizardData.bodyType?.id });
    },
    enabled: currentSubstep === 'brand',
  });

  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: ['models', wizardData.brand?.id, wizardData.bodyType?.id],
    queryFn: () =>
      autoApi.getModels({
        brandId: wizardData.brand!.id,
        bodyTypeId: wizardData.bodyType?.id,
      }),
    enabled: currentSubstep === 'model' || currentSubstep === 'brand',
  });

  const { data: generations, isLoading: generationsAreLoading } = useQuery({
    queryKey: ['generations', wizardData.model?.id, wizardData.bodyType?.id],
    queryFn: () =>
      autoApi.getGenerations({
        modelId: wizardData.model!.id,
        bodyTypeId: wizardData.bodyType?.id,
      }),
    enabled: currentSubstep === 'generation',
  });

  const { data: bodyTypes, isLoading: bodyTypesAreLoading } = useQuery({
    queryKey: ['body-types'],
    queryFn: autoApi.getBodyTypes,
    enabled: currentSubstep === 'bodyType',
  });

  const { data: configurations, isLoading: configurationsAreLoading } =
    useQuery({
      queryKey: ['configurations', wizardData.generation?.id],
      queryFn: () =>
        autoApi.getConfigurations({ generationId: wizardData.generation!.id }),
      enabled: currentSubstep === 'configuration',
    });

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

  useEffect(() => {
    if (bodyTypes?.length === 1 && !bodyTypesAreLoading) {
      updateData({ generation: bodyTypes[0] });
    }
  }, [bodyTypes, bodyTypesAreLoading, updateData]);

  return {
    brands,
    brandsAreLoading,
    models,
    modelsAreLoading,
    generations,
    generationsAreLoading,
    configurations,
    configurationsAreLoading,
    bodyTypes,
    bodyTypesAreLoading,
  };
};
