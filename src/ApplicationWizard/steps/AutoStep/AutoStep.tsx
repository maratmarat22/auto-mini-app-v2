/* eslint-disable no-fallthrough */
import {
  Caption,
  Text,
  Headline,
  Subheadline,
  Section,
} from '@telegram-apps/telegram-ui';
import { Info, CarFront } from 'lucide-react';
import { useState } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { SelectSubstep } from './components/SelectSubstep';
import { SubstepButton } from './components/SubstepButton';
import { useAutoQueries } from './hooks/useAutoQueries';
import { SUBSTEP_CONFIG as SUBSTEP_GROUPS_CONFIG } from './substepsConfig';

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
    const config = SUBSTEP_GROUPS_CONFIG.flatMap((g) => g.configs).find(
      (i) => i.propToChange === currentSubstep,
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

        <div className={styles.groupsContainer}>
          {SUBSTEP_GROUPS_CONFIG.map((g) => {
            const visibleItems = g.configs.filter(
              (i) => !i.isVisible || i.isVisible(application.auto),
            );

            if (visibleItems.length === 0) {
              return null;
            }

            return (
              <Section
                key={g.id}
                header={g.title.toUpperCase()}
                // Оставляем className только если нужно убрать внешние маржины самого Section
                className={styles.groupContainer}
              >
                <div className={styles.buttonsList}>
                  {visibleItems.map((vi) => (
                    <SubstepButton
                      key={vi.propToChange}
                      value={application.auto[vi.propToChange]}
                      onClick={() => {
                        setCurrentSubstep(vi.propToChange);
                        setOnSubstep(true);
                      }}
                      text={vi.getButtonLabel(application.auto)}
                    />
                  ))}
                </div>
              </Section>
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
