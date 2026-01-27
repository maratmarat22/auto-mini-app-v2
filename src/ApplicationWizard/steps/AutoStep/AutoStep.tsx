import { Button } from '@telegram-apps/telegram-ui';
import { CircleArrowRight, CircleCheck, CircleX } from 'lucide-react';
import { useState } from 'react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';
import { BrandSubstep } from './substeps/BrandSubstep';
import { ModelSubstep } from './substeps/ModelSubstep';

import type { WizardData } from '@/ApplicationWizard/types/wizard';

type AutoSubstep = 'brand' | 'model' | 'bodyType' | null;

export const AutoStep = () => {
  const {
    data: wizardData,
    updateData,
    onSubstep,
    setOnSubstep,
  } = useWizardStore();
  const [currentSubstep, setCurrentSubstep] = useState<AutoSubstep>(null);

  const handleSelect = (
    field: keyof WizardData,
    value: string,
    label: string,
  ) => {
    if (field === 'brand') {
      updateData({ brand: { id: value, name: label }, model: null });
    } else {
      updateData({ [field]: { id: value, name: label } });
    }
    setCurrentSubstep(null);
    setOnSubstep(false);
  };

  if (onSubstep && currentSubstep === 'brand') {
    return <BrandSubstep onSelect={handleSelect} />;
  }

  if (onSubstep && currentSubstep === 'model') {
    return <ModelSubstep onSelect={handleSelect} />;
  }

  if (onSubstep && currentSubstep === 'bodyType') {
    return;
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          mode={wizardData.brand ? 'filled' : 'bezeled'}
          after={
            // Здесь всегда стандартные иконки, они просто будут перекрываться
            wizardData.brand ? (
              <CircleCheck size={20} />
            ) : (
              <CircleArrowRight size={20} />
            )
          }
          onClick={() => {
            setCurrentSubstep('brand');
            setOnSubstep(true);
          }}
        >
          {wizardData.brand
            ? `Марка: ${wizardData.brand.name}`
            : 'Выберите марку'}
        </Button>

        {/* Иконка удаления появляется ПОВЕРХ иконки after при наведении */}
        {wizardData.brand && (
          <div
            className={styles.xIconWrapper}
            onClick={(e) => {
              e.stopPropagation(); // ОСТАНАВЛИВАЕМ клик, чтобы не открылось меню
              updateData({ brand: null, model: null });
            }}
          >
            <CircleX size={20} />
          </div>
        )}
      </div>
      <Button
        className={styles.button}
        after={
          wizardData.model ? (
            <CircleCheck size={20} />
          ) : (
            <CircleArrowRight size={20} />
          )
        }
        disabled={!wizardData.brand}
        mode={
          wizardData.brand ? (wizardData.model ? 'filled' : 'bezeled') : 'gray'
        }
        onClick={() => {
          setCurrentSubstep('model');
          setOnSubstep(true);
        }}
      >
        {wizardData.model
          ? `Модель: ${wizardData.model.name}`
          : 'Выберите модель'}
      </Button>
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
          setCurrentSubstep('bodyType');
          setOnSubstep(true);
        }}
      >
        {wizardData.bodyType || 'Выберите тип кузова'}
      </Button>
    </div>
  );
};
