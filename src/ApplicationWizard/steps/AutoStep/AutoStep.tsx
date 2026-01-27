import { useState } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { SelectSubstep } from './components/SelectSubstep';
import { SubstepButton } from './components/SubstepButton';
import { useAutoQueries } from './hooks/useAutoQueries';
import { SUBSTEP_CONFIG } from './substepsConfig';

import type { AutoField, AutoSubstep } from './types/types';

export const AutoStep = () => {
  const {
    data: wizardData,
    updateData,
    onSubstep,
    setOnSubstep,
  } = useWizardStore();
  const [currentSubstep, setCurrentSubstep] = useState<AutoSubstep>(null);

  const autoQueries = useAutoQueries();
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
    bodyType: {
      list: autoQueries.bodyTypes,
      isLoading: autoQueries.bodyTypesAreLoading,
    },
  };

  const handleSelect = (
    field: AutoField,
    item: { id: string; name: string },
  ) => {
    if (field === 'brand') {
      updateData({
        brand: item,
        model: null,
        generation: null,
      });
    } else if (field === 'model') {
      updateData({
        model: item,
        generation: null,
      });
    } else if (field === 'generation') {
      updateData({
        generation: item,
      });
    } else if (field === 'bodyType') {
      updateData({
        bodyType: item,
      });
    }

    setCurrentSubstep(null);
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
    <div className={styles.menuContainer}>
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
  );
};
