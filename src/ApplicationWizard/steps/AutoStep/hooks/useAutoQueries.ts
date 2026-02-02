import { useQuery } from '@tanstack/react-query';

import { autoApi } from '@/ApplicationWizard/api/autoApi';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

export const useAutoQueries = () => {
  const { application } = useWizardStore();

  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: [
      'brands',
      application.auto.bodyType?.id,
      application.auto.engineType?.id,
      application.auto.gearType?.id,
      application.auto.transmission?.id,
    ],
    queryFn: () => {
      return autoApi.getBrands({ bodyTypeId: application.auto.bodyType?.id });
    },
  });

  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: ['models', application.auto.brand?.id],
    queryFn: () =>
      autoApi.getModels({
        brandId: application.auto.brand!.id,
      }),
    enabled: !!application.auto.brand,
  });

  const { data: generations, isLoading: generationsAreLoading } = useQuery({
    queryKey: ['generations', application.auto.model?.id],
    queryFn: () =>
      autoApi.getGenerations({
        modelId: application.auto.model!.id,
      }),
    enabled: !!application.auto.model,
  });

  const { data: configurations, isLoading: configurationsAreLoading } =
    useQuery({
      queryKey: ['configurations', application.auto.generation?.id],
      queryFn: () =>
        autoApi.getConfigurations({
          generationId: application.auto.generation!.id,
        }),
      enabled: !!application.auto.generation,
    });

  const { data: modifications, isLoading: modificationsAreLoading } = useQuery({
    queryKey: ['modifications', application.auto.configuration?.id],
    queryFn: () =>
      autoApi.getModifications({
        configurationId: application.auto.configuration!.id,
      }),
    enabled: !!application.auto.configuration,
  });

  const { data: bodyTypes, isLoading: bodyTypesAreLoading } = useQuery({
    queryKey: [
      'body-types',
      application.auto.brand,
      application.auto.model,
      application.auto.configuration,
      application.auto.modification,
    ],
    queryFn: autoApi.getBodyTypes,
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

  return {
    brands,
    brandsAreLoading,
    models,
    modelsAreLoading,
    generations,
    generationsAreLoading,
    configurations,
    configurationsAreLoading,
    modifications,
    modificationsAreLoading,

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
