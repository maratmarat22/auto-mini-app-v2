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
      return autoApi.getBrands(application.auto);
    },
  });

  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: [
      'models',
      application.auto.brand?.id,
      application.auto.bodyType?.id,
    ],
    queryFn: () => autoApi.getModels(application.auto),
    enabled: !!application.auto.brand,
  });

  const { data: generations, isLoading: generationsAreLoading } = useQuery({
    queryKey: [
      'generations',
      application.auto.model?.id,
      application.auto.bodyType?.id,
    ],
    queryFn: () => autoApi.getGenerations(application.auto),
    enabled: !!application.auto.model,
  });

  const { data: configurations, isLoading: configurationsAreLoading } =
    useQuery({
      queryKey: [
        'configurations',
        application.auto.generation?.id,
        application.auto.bodyType?.id,
      ],
      queryFn: () => autoApi.getConfigurations(application.auto),
      enabled: !!application.auto.generation,
    });

  const { data: modifications, isLoading: modificationsAreLoading } = useQuery({
    queryKey: ['modifications', application.auto.configuration?.id],
    queryFn: () => autoApi.getModifications(application.auto),
    enabled: !!application.auto.configuration,
  });

  const { data: bodyTypes, isLoading: bodyTypesAreLoading } = useQuery({
    queryKey: [
      'body-types',
      application.auto.brand?.id,
      application.auto.model?.id,
      application.auto.generation?.id,
      application.auto.configuration?.id,
    ],
    queryFn: () => autoApi.getBodyTypes(application.auto),
  });

  const { data: engineTypes, isLoading: engineTypesAreLoading } = useQuery({
    queryKey: [
      'engine-types',
      application.auto.bodyType?.id,
      application.auto.brand?.id,
      application.auto.model?.id,
      application.auto.generation?.id,
      application.auto.configuration?.id,
      application.auto.modification?.id,
    ],
    queryFn: () => autoApi.getEngineTypes(application.auto),
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
