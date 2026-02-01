import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { autoApi } from '@/ApplicationWizard/api/autoApi';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import type { AutoSubstep } from '../types/prop&substep';

export const useAutoQueries = (_currentSubstep: AutoSubstep) => {
  const { application: wizardData, updateData } = useWizardStore();

  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: [
      'brands',
      wizardData.auto.bodyType,
      wizardData.auto.engineType,
      wizardData.auto.gearType,
      wizardData.auto.transmission,
    ],
    queryFn: () => {
      return autoApi.getBrands(wizardData.auto);
    },
  });

  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: ['models', wizardData.brand?.id, wizardData.bodyType?.id],
    queryFn: () =>
      autoApi.getModels({
        brandId: wizardData.brand!.id,
        bodyTypeId: wizardData.bodyType?.id,
      }),
    enabled: !!wizardData.brand,
  });

  const { data: generations, isLoading: generationsAreLoading } = useQuery({
    queryKey: ['generations', wizardData.model?.id, wizardData.bodyType?.id],
    queryFn: () =>
      autoApi.getGenerations({
        modelId: wizardData.model!.id,
        bodyTypeId: wizardData.bodyType?.id,
      }),
    enabled: !!wizardData.model,
  });

  const { data: configurations, isLoading: configurationsAreLoading } = useQuery({
    queryKey: ['configurations', wizardData.generation?.id],
    queryFn: () => autoApi.getConfigurations({ generationId: wizardData.generation!.id }),
    enabled: !!wizardData.generation,
  });

  const { data: bodyTypes, isLoading: bodyTypesAreLoading } = useQuery({
    queryKey: [
      'body-types',
      wizardData.auto.brand,
      wizardData.auto.model,
      wizardData.auto.configuration,
      wizardData.auto.modification,
    ],
    queryFn: () => autoApi.getBodyTypes(wizardData.auto),
  });

  const { data: engineTypes, isLoading: engineTypesAreLoading } = useQuery({
    queryKey: ['engine-types'],
    queryFn: autoApi.getEngineTypes,
  });

  const { data: gearTypes, isLoading: gearTypesAreLoading } = useQuery({
    queryKey: ['gear-types'],
    queryFn: autoApi.getGearTypes,
  });

  const { data: transmissions, isLoading: transmissionsAreLoading } = useQuery({
    queryKey: ['transmissions'],
    queryFn: autoApi.getTransmissions,
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
    if (configurations?.length === 1 && !configurationsAreLoading) {
      updateData({ configuration: configurations[0] });
    }
  }, [configurations, configurationsAreLoading, updateData]);

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
    engineTypes,
    engineTypesAreLoading,
    gearTypes,
    gearTypesAreLoading,
    transmissions,
    transmissionsAreLoading,
  };
};
