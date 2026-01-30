import {
  Caption,
  Text,
  Headline,
  Subheadline,
} from '@telegram-apps/telegram-ui';
import { Info, CarFront } from 'lucide-react';
import { useState } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { SelectSubstep } from './components/SelectSubstep';
import { SubstepButton } from './components/SubstepButton';
import { useAutoQueries } from './hooks/useAutoQueries';
import { SUBSTEP_CONFIG } from './substepsConfig';

import '../steps.css';

import type { AutoField, AutoSubstep } from './types/types';

export const AutoStep = () => {
  const {
    data: wizardData,
    updateData,
    onSubstep,
    setOnSubstep,
  } = useWizardStore();
  const [currentSubstep, setCurrentSubstep] = useState<AutoSubstep>(null);

  const isStepValid = !!(wizardData.brand || wizardData.bodyType);

  const autoQueries = useAutoQueries(currentSubstep);
  const autoQueriesMap = {
    brand: {
      list: autoQueries.brands,
      isLoading: autoQueries.brandsAreLoading,
    },
    model: {
      list: autoQueries.models,
      isLoading: autoQueries.modelsAreLoading,
    },
    generation: {
      list: autoQueries.generations,
      isLoading: autoQueries.generationsAreLoading,
    },
    configuration: {
      list: autoQueries.configurations,
      isLoading: autoQueries.configurationsAreLoading,
    },
    bodyType: {
      list: autoQueries.bodyTypes,
      isLoading: autoQueries.bodyTypesAreLoading,
    },
  };

  const handleSelect = (
    field: AutoField,
    item: { id: string; name: string } | null,
  ) => {
    const isChanged = wizardData[field]?.id !== item?.id;

    const updates: Record<AutoField, () => void> = {
      brand: () =>
        isChanged && updateData({ brand: item, model: null, generation: null }),
      model: () => isChanged && updateData({ model: item, generation: null }),
      generation: () => isChanged && updateData({ generation: item }),
      configuration: () => isChanged && updateData({ configuration: item }),
      bodyType: () =>
        updateData({
          bodyType: item,
          brand: null,
          model: null,
          generation: null,
        }),
    };

    updates[field]?.();
    setOnSubstep(false);
  };

  if (onSubstep && currentSubstep) {
    const config = SUBSTEP_CONFIG.find((s) => s.field === currentSubstep);
    const { list, isLoading } = autoQueriesMap[currentSubstep];

    return (
      <SelectSubstep
        list={list}
        isLoading={isLoading}
        onSelect={handleSelect}
        targetField={currentSubstep}
        header={config?.header || ''}
        placeholder={config?.placeholder || ''}
      />
    );
  }

  return (
    <>
      <div className="stepContainer">
        <div className="stepHeader">
          <div className="stepIcon">
            <CarFront size={32} />
          </div>
          <Headline weight="1">Параметры авто</Headline>
          <Subheadline className="stepDesc">
            Уточните базовую информацию об автомобиле, чтобы мы подобрали лучшие
            варианты.
          </Subheadline>
        </div>

        <div className={styles.buttonsList}>
          {SUBSTEP_CONFIG.map((config) => {
            if (config.showIf && !config.showIf(wizardData)) return null;

            return (
              <SubstepButton
                key={config.field}
                value={wizardData[config.field]}
                onClick={() => {
                  setCurrentSubstep(config.field);
                  setOnSubstep(true);
                }}
                text={config.getLabel(wizardData)}
              />
            );
          })}
        </div>
      </div>

      <div
        className={`${styles.footerHint} ${isStepValid ? styles.hintValid : ''}`}
      >
        <div className={styles.hintIconWrapper}>
          <Info size={18} />
        </div>
        <div className={styles.hintContent}>
          <Text weight="2" className={styles.hintTitle}>
            Требование для шага
          </Text>
          <Caption className={styles.hintText}>
            Необходимо выбрать хотя бы <b>марку</b> или <b>тип кузова</b>.
          </Caption>
        </div>
      </div>
    </>
  );
};
