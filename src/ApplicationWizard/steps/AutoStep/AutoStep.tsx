import {
  Caption,
  Text,
  Headline,
  Subheadline,
} from '@telegram-apps/telegram-ui';
import { Info, Car } from 'lucide-react';
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

  const isStepValid = !!(wizardData.brand || wizardData.bodyType);

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
      updateData({ brand: item, model: null, generation: null });
    } else if (field === 'model') {
      updateData({ model: item, generation: null });
    } else if (field === 'generation') {
      updateData({ generation: item });
    } else if (field === 'bodyType') {
      updateData({ bodyType: item });
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
      {/* Верхний блок: Иконка и заголовок */}
      <div className={styles.header}>
        <div className={styles.iconCircle}>
          <Car size={32} className={styles.mainIcon} />
        </div>
        <Headline weight="1">Параметры авто</Headline>
        <Subheadline className={styles.description}>
          Уточните базовую информацию об автомобиле, чтобы мы подобрали лучшие
          варианты
        </Subheadline>
      </div>

      {/* Список кнопок выбора */}
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

      {/* Нижний блок: Подсказка */}
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
    </div>
  );
};
