import { Button } from '@telegram-apps/telegram-ui';
import { CircleArrowRight, CircleCheck } from 'lucide-react';
import { useState } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { BrandSubstep } from './substeps/BrandSubstep/BrandSubstep';

import type { WizardData } from '@/ApplicationWizard/types/wizard';

type AutoSubstep = 'brand' | 'model' | 'bodyType' | null;

export const AutoStep = () => {
  const { data: wizardData, updateData } = useWizardStore();
  const [currentSubstep, setCurrentSubstep] = useState<AutoSubstep>(null);

  const handleSelect = (field: keyof WizardData, value: string) => {
    if (field === 'brand') {
      updateData({ brand: value, model: null });
    } else {
      updateData({ [field]: value });
    }
    setCurrentSubstep(null);
  };

  //: Loading data
  // const { data: brands, isLoading: brandsAreLoading } = useQuery({
  //   queryKey: ['brands'],
  //   queryFn: autoApi.getBrands,
  // });
  // const { data: models, isLoading: modelsAreLoading } = useQuery({
  //   queryKey: ['models', wizardData.brand],
  //   queryFn: () => autoApi.getModels(wizardData.brand!),
  //   enabled: !!wizardData.brand,
  // });
  // const { data: bodyTypes, isLoading: bodyTypesAreLoading } = useQuery({
  //   queryKey: ['body-types'],
  //   queryFn: autoApi.getBodyTypes,
  // });

  //: Normalization
  // const filteredItems = useMemo(() => {
  //   const currentList = !wizardData.brand ? brands : models;
  //   return currentList?.filter((item) =>
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );
  // }, [searchQuery, brands, models, wizardData.brand]);

  // if (brandsAreLoading || modelsAreLoading || bodyTypesAreLoading)
  //   return (
  //     <div className={styles.spinnerContainer}>
  //       <Spinner size="m" className={styles.spinner} />
  //     </div>
  //   );

  if (currentSubstep === 'brand') {
    return <BrandSubstep onSelect={handleSelect} />;
  }

  if (currentSubstep === 'model') {
    return;
  }

  if (currentSubstep === 'bodyType') {
    return;
  }

  return (
    <div className={styles.menuContainer}>
      <Button
        className={styles.button}
        after={
          wizardData.brand ? (
            <CircleCheck size={20} />
          ) : (
            <CircleArrowRight size={20} />
          )
        }
        onClick={() => setCurrentSubstep('brand')}
      >
        {wizardData.brand ? `Марка: ${wizardData.brand}` : 'Выберите марку'}
      </Button>
      <Button
        className={styles.button}
        after={
          wizardData.model ? (
            <CircleCheck size={20} />
          ) : (
            <CircleArrowRight size={20} />
          )
        }
        mode={wizardData.brand ? 'filled' : 'bezeled'}
        onClick={() => setCurrentSubstep('model')}
      >
        {wizardData.model || 'Выберите модель'}
      </Button>
      <Button
        className={styles.button}
        after={
          wizardData.bodyType ? (
            <CircleCheck size={20} />
          ) : (
            <CircleArrowRight size={20} />
          )
        }
        onClick={() => setCurrentSubstep('bodyType')}
      >
        {wizardData.bodyType || 'Выберите тип кузова'}
      </Button>
    </div>
  );
};
