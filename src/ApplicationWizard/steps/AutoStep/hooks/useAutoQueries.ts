import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { autoApi } from '@/ApplicationWizard/api/autoApi';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import type { AutoEntity } from '@/ApplicationWizard/types/wizardStore';

export const useAutoQueries = () => {
  const { application, updateData } = useWizardStore();
  const autoData = application.specificAutoData;

  const useAutoStepQuery = (
    key: string,
    dependencyId: string | undefined,
    queryFn: (id: string) => Promise<AutoEntity[]>,
    targetProp: keyof typeof autoData,
  ) => {
    const query = useQuery({
      queryKey: [key, dependencyId],
      queryFn: () => queryFn(dependencyId!),
      enabled: !!dependencyId,
    });

    useEffect(() => {
      if (query.data?.length === 1 && !autoData[targetProp]) {
        updateData({
          specificAutoData: { ...autoData, [targetProp]: query.data[0] },
        });
      }
    }, [query.data, targetProp]);

    return query;
  };

  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });

  const modelsQuery = useAutoStepQuery(
    'models',
    autoData.brand?.id,
    autoApi.getModels,
    'model',
  );
  const generationsQuery = useAutoStepQuery(
    'generations',
    autoData.model?.id,
    autoApi.getGenerations,
    'generation',
  );
  const configurationsQuery = useAutoStepQuery(
    'configurations',
    autoData.generation?.id,
    autoApi.getConfigurations,
    'configuration',
  );
  const modificationsQuery = useAutoStepQuery(
    'modifications',
    autoData.configuration?.id,
    autoApi.getModifications,
    'modification',
  );

  // const { data: models, isLoading: modelsAreLoading } = useQuery({
  //   queryKey: ['models', application.specificAutoData.brand?.id],
  //   queryFn: () => autoApi.getModels(application.specificAutoData.brand!.id),
  //   enabled: !!application.specificAutoData.brand,
  // });

  // const { data: generations, isLoading: generationsAreLoading } = useQuery({
  //   queryKey: ['generations', application.specificAutoData.model?.id],
  //   queryFn: () =>
  //     autoApi.getGenerations(application.specificAutoData.model!.id),
  //   enabled: !!application.specificAutoData.model,
  // });

  // const { data: configurations, isLoading: configurationsAreLoading } =
  //   useQuery({
  //     queryKey: ['configurations', application.specificAutoData.generation?.id],
  //     queryFn: () =>
  //       autoApi.getConfigurations(application.specificAutoData.generation!.id),
  //     enabled: !!application.specificAutoData.generation,
  //   });

  // const { data: modifications, isLoading: modificationsAreLoading } = useQuery({
  //   queryKey: ['modifications', application.specificAutoData.configuration?.id],
  //   queryFn: () =>
  //     autoApi.getModifications(application.specificAutoData.configuration!.id),
  //   enabled: !!application.specificAutoData.configuration,
  // });

  // const { data: bodyTypes, isLoading: bodyTypesAreLoading } = useQuery({
  //   queryKey: [
  //     'body-types',
  //     application.specificAutoData.brand?.id,
  //     application.specificAutoData.model?.id,
  //     application.specificAutoData.generation?.id,
  //     application.specificAutoData.configuration?.id,
  //   ],
  //   queryFn: () => autoApi.getBodyTypes(application.specificAutoData),
  // });

  // const { data: engineTypes, isLoading: engineTypesAreLoading } = useQuery({
  //   queryKey: [
  //     'engine-types',
  //     application.specificAutoData.bodyType?.id,
  //     application.specificAutoData.brand?.id,
  //     application.specificAutoData.model?.id,
  //     application.specificAutoData.generation?.id,
  //     application.specificAutoData.configuration?.id,
  //     application.specificAutoData.modification?.id,
  //   ],
  //   queryFn: () => autoApi.getEngineTypes(application.specificAutoData),
  // });

  // const { data: gearTypes, isLoading: gearTypesAreLoading } = useQuery({
  //   queryKey: [
  //     'gear-types',
  //     application.specificAutoData.bodyType?.id,
  //     application.specificAutoData.brand?.id,
  //     application.specificAutoData.model?.id,
  //     application.specificAutoData.generation?.id,
  //     application.specificAutoData.configuration?.id,
  //     application.specificAutoData.modification?.id,
  //   ],
  //   queryFn: () => autoApi.getGearTypes(application.specificAutoData),
  // });

  // const { data: transmissions, isLoading: transmissionsAreLoading } = useQuery({
  //   queryKey: [
  //     'transmissions',
  //     application.specificAutoData.bodyType?.id,
  //     application.specificAutoData.brand?.id,
  //     application.specificAutoData.model?.id,
  //     application.specificAutoData.generation?.id,
  //     application.specificAutoData.configuration?.id,
  //     application.specificAutoData.modification?.id,
  //   ],
  //   queryFn: () => autoApi.getTransmissions(application.specificAutoData),
  // });

  return {
    brands: brandsQuery.data,
    brandsAreLoading: brandsQuery.isLoading,

    models: modelsQuery.data,
    modelsAreLoading: modelsQuery.isLoading,

    generations: generationsQuery.data,
    generationsAreLoading: generationsQuery.isLoading,

    configurations: configurationsQuery.data,
    configurationsAreLoading: configurationsQuery.isLoading,

    modifications: modificationsQuery.data,
    modificationsAreLoading: modificationsQuery.isLoading,

    // bodyTypes: bodyTypesQuery.data,
    // bodyTypesAreLoading: bodyTypesQuery.isLoading,
    // engineTypes: engineTypesQuery.data,
    // engineTypesAreLoading: engineTypesQuery.isLoading,
    // gearTypes: gearTypesQuery.data,
    // gearTypesAreLoading: gearTypesQuery.isLoading,
    // transmissions: transmissionsQuery.data,
    // transmissionsAreLoading: transmissionsQuery.isLoading,
  };
};
