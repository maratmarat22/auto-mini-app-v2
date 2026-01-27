import { Button } from '@telegram-apps/telegram-ui';
import { CircleArrowRight, CircleCheck } from 'lucide-react';
import { useState } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { SelectSubstep } from './components/SelectSubstep';
import { SubstepButton } from './components/SubstepButton';
import { useAutoQueries } from './hooks/useAutoQueries';
import { SUBSTEP_CONFIG } from './substepsConfig';

import type { AutoStepField } from './types/autoStepField';

export const AutoStep = () => {
  const {
    data: wizardData,
    updateData,
    onSubstep,
    setOnSubstep,
  } = useWizardStore();
  const [currentSubstep, setCurrentSubstep] = useState<AutoStepField>(null);

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
  };

  const handleSelect = (
    field: AutoStepField,
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

      <Button
        className={styles.button}
        mode={wizardData.bodyType ? 'filled' : 'bezeled'}
        after={
          wizardData.bodyType ? (
            <CircleCheck size={20} />
          ) : (
            <CircleArrowRight size={20} />
          )
        }
        onClick={() => {
          setOnSubstep(true);
        }}
      >
        {wizardData.bodyType || 'Выберите тип кузова'}
      </Button>
    </div>
  );
};
