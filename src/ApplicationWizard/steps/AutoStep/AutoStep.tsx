/* eslint-disable no-fallthrough */
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

import type { AutoProp as AutoProp, AutoSubstep } from './types/prop&substep';
import type { AutoEntity } from '@/ApplicationWizard/types/wizard';

export const AutoStep = () => {
  const { application, updateData, onSubstep, setOnSubstep } = useWizardStore();
  const [currentSubstep, setCurrentSubstep] = useState<AutoSubstep>(null);
  const isStepValid = application.auto.bodyType || application.auto.brand;

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
    configuration: {
      list: autoQueries.configurations,
      isLoading: autoQueries.configurationsAreLoading,
    },
    modification: {
      list: autoQueries.modifications,
      isLoading: autoQueries.modificationsAreLoading,
    },
    bodyType: {
      list: autoQueries.bodyTypes,
      isLoading: autoQueries.bodyTypesAreLoading,
    },
    engineType: {
      list: autoQueries.engineTypes,
      isLoading: autoQueries.engineTypesAreLoading,
    },
    gearType: {
      list: autoQueries.gearTypes,
      isLoading: autoQueries.gearTypesAreLoading,
    },
    transmission: {
      list: autoQueries.transmissions,
      isLoading: autoQueries.transmissionsAreLoading,
    },
  };

  const handleSelect = (prop: AutoProp, value: AutoEntity | null) => {
    if (application.auto[prop]?.id !== value?.id) {
      const currentAuto = application.auto;
      const newAutoData = { ...currentAuto, [prop]: value };

      switch (prop) {
        case 'bodyType':
          newAutoData.brand = null;
        case 'brand':
          newAutoData.model = null;
        case 'model':
          newAutoData.generation = null;
        case 'generation':
          newAutoData.configuration = null;
        case 'configuration':
          newAutoData.modification = null;
          break;
      }
      updateData({ auto: newAutoData });
    }
    setCurrentSubstep(null);
    setOnSubstep(false);
  };

  if (onSubstep && currentSubstep) {
    const config = SUBSTEP_CONFIG.find(
      (s) => s.propToChange === currentSubstep,
    );
    if (!config) return null;
    const { list, isLoading } = autoQueriesMap[config.propToChange];

    return (
      <SelectSubstep
        list={list}
        isLoading={isLoading}
        onSelect={handleSelect}
        targetField={currentSubstep}
        header={config?.searchHeader || ''}
        placeholder={config?.searchPlaceholder || ''}
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
            if (config.isShowable && !config.isShowable(application.auto))
              return null;

            return (
              <SubstepButton
                key={config.propToChange}
                value={application.auto[config.propToChange]}
                onClick={() => {
                  setCurrentSubstep(config.propToChange);
                  setOnSubstep(true);
                }}
                text={config.getButtonLabel(application.auto)}
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
