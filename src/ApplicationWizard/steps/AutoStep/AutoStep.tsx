/* eslint-disable no-fallthrough */
import {
  Caption,
  Text,
  Headline,
  Subheadline,
  Section,
} from '@telegram-apps/telegram-ui';
import { Info, CarFront } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { RangeInputModal } from './components/RangeInputModal';
import { SelectSubstep } from './components/SelectSubstep';
import {
  RangeInputSubstepButton,
  SelectSubstepButton,
} from './components/SubstepButton';
import { useAutoQueries } from './hooks/useAutoQueries';
import {
  SUBSTEPS_CONFIG,
  type RangeInputSubstepConfig,
  type SelectSubstepConfig,
} from './substepsConfig';

import '../steps.css';

import type { SelectableAutoProp, AutoSubstep } from './types/prop&substep';
import type { AutoEntity } from '@/ApplicationWizard/types/wizard';

export const AutoStep = () => {
  const { application, updateData, onSubstep, setOnSubstep } = useWizardStore();
  const [currentSubstep, setCurrentSubstep] = useState<AutoSubstep>(null);
  const isStepValid = application.auto.bodyType || application.auto.brand;

  const [displacementModalVisible, setDisplacementModalVisible] =
    useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [onSubstep, currentSubstep]);

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

  const handleSelect = (prop: SelectableAutoProp, value: AutoEntity | null) => {
    if (application.auto[prop]?.id !== value?.id) {
      const currentAuto = application.auto;
      const newAutoData = { ...currentAuto, [prop]: value };

      switch (prop) {
        case 'brand':
          newAutoData.model = null;
          newAutoData.bodyType = null;
          newAutoData.engineType = null;
          newAutoData.gearType = null;
          newAutoData.transmission = null;
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
    const config = SUBSTEPS_CONFIG.find(
      (c) => (c as SelectSubstepConfig).prop === currentSubstep,
    ) as SelectSubstepConfig;
    if (!config) return null;
    const { list, isLoading } = autoQueriesMap[config.prop];

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

  const configsByGroup = SUBSTEPS_CONFIG.reduce(
    (acc, sc) => {
      const key = sc.group;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(sc);
      return acc;
    },
    {} as Record<string, (SelectSubstepConfig | RangeInputSubstepConfig)[]>,
  );

  console.log(configsByGroup);

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
          {Object.entries(configsByGroup).map(([groupName, configs]) => {
            const visibleConfigs = configs.filter(
              (c) => !c.isVisible || c.isVisible(application.auto),
            );

            if (visibleConfigs.length === 0) {
              return null;
            }

            return (
              <Section
                key={groupName}
                header={
                  configs[0].group === 'main'
                    ? 'ОСНОВНАЯ ИНФОРМАЦИЯ'
                    : 'ХАРАКТЕРИСТИКИ'
                }
                className={styles.groupContainer}
              >
                <div className={styles.buttonsList}>
                  {visibleConfigs.map((c) => {
                    if ('prop' in c) {
                      return (
                        <SelectSubstepButton
                          key={c.prop}
                          value={application.auto[c.prop]}
                          onClick={() => {
                            setCurrentSubstep(c.prop);
                            setOnSubstep(true);
                          }}
                          text={c.getButtonLabel(application.auto)}
                        />
                      );
                    } else if ('fromProp' in c) {
                      return (
                        <RangeInputSubstepButton
                          key={c.fromProp}
                          fromValue={application.auto[c.fromProp]}
                          toValue={application.auto[c.toProp]}
                          onClick={() => setDisplacementModalVisible(true)}
                          text={c.getButtonLabel(application.auto)}
                        />
                      );
                    }
                  })}
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

      {displacementModalVisible && (
        <RangeInputModal
          isOpen={displacementModalVisible}
          onClose={() => setDisplacementModalVisible(false)}
          onSave={() => {}}
          header="test"
        />
      )}
    </>
  );
};
