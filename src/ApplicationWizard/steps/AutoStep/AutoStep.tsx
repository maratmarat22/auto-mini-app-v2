import { Headline, Subheadline, Section } from '@telegram-apps/telegram-ui';
import { CarFront } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { RangeInputModal } from './components/RangeInputModal';
import { SelectSubstep } from './components/SelectSubstep';
import { SelectSubstepButton } from './components/SubstepButton';
import { useAutoQueries } from './hooks/useAutoQueries';
import { SPECIFIC_SUBSTEP_CONFIGS } from './substepsConfig';

import type { SpecificAutoDataProp } from './types/prop&substep';
import type { AutoEntity } from '@/ApplicationWizard/types/wizardStore';

import '../steps.css';

// Порядок сброса зависимых полей
const AUTO_FIELDS_CHAIN: SpecificAutoDataProp[] = [
  'brand',
  'model',
  'generation',
  'configuration',
  'modification',
];

export const AutoStep = () => {
  const { application, updateData, onSubstep, setOnSubstep, setOnModal } =
    useWizardStore();
  const [currentSubstep, setCurrentSubstep] =
    useState<SpecificAutoDataProp | null>(null);
  const [displacementModalVisible, setDisplacementModalVisible] =
    useState(false);

  const autoQueries = useAutoQueries();

  // Автоматическое создание мапы из хука запросов
  const autoQueriesMap = useMemo(
    () => ({
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
      // bodyType: {
      //   list: autoQueries.bodyTypes,
      //   isLoading: autoQueries.bodyTypesAreLoading,
      // },
      // engineType: {
      //   list: autoQueries.engineTypes,
      //   isLoading: autoQueries.engineTypesAreLoading,
      // },
      // gearType: {
      //   list: autoQueries.gearTypes,
      //   isLoading: autoQueries.gearTypesAreLoading,
      // },
      // transmission: {
      //   list: autoQueries.transmissions,
      //   isLoading: autoQueries.transmissionsAreLoading,
      // },
    }),
    [autoQueries],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [onSubstep, currentSubstep]);

  const handleSelect = (prop: string, value: AutoEntity | null) => {
    if (
      application.specificAutoData[prop as SpecificAutoDataProp]?.id !==
      value?.id
    ) {
      const newAutoData = { ...application.specificAutoData, [prop]: value };

      // Логика сброса зависимых полей
      const fieldIndex = AUTO_FIELDS_CHAIN.indexOf(
        prop as SpecificAutoDataProp,
      );
      if (fieldIndex !== -1) {
        AUTO_FIELDS_CHAIN.slice(fieldIndex + 1).forEach((field) => {
          newAutoData[field] = null;
        });
      }

      updateData({ specificAutoData: newAutoData });
    }

    setCurrentSubstep(null);
    setOnSubstep(false);
  };

  // Рендер режима выбора (Substep)
  if (onSubstep && currentSubstep) {
    const config = SPECIFIC_SUBSTEP_CONFIGS.find(
      (c) => c.prop === currentSubstep,
    );
    const query = autoQueriesMap[currentSubstep];

    if (config && query) {
      return (
        <SelectSubstep
          options={query.list}
          isLoading={query.isLoading}
          onSelect={handleSelect}
          propName={currentSubstep}
          header={config.searchHeader || ''}
          placeholder={config.searchPlaceholder || ''}
        />
      );
    }
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
          <Section
            header="ОСНОВНАЯ ИНФОРМАЦИЯ"
            className={styles.groupContainer}
          >
            <div className={styles.buttonsList}>
              {SPECIFIC_SUBSTEP_CONFIGS.map((c) => (
                <SelectSubstepButton
                  key={c.prop}
                  value={application.specificAutoData[c.prop]}
                  onClick={() => {
                    setCurrentSubstep(c.prop);
                    setOnSubstep(true);
                  }}
                  text={c.getButtonLabel(application.specificAutoData)}
                  disabled={
                    c.disabled
                      ? c.disabled(application.specificAutoData)
                      : false
                  }
                />
              ))}
            </div>
          </Section>
        </div>
      </div>

      <RangeInputModal
        isOpen={displacementModalVisible}
        onClose={() => {
          setOnModal(false);
          setDisplacementModalVisible(false);
        }}
        onSave={() => {}}
        header="Объём двигателя"
      />
    </>
  );
};
