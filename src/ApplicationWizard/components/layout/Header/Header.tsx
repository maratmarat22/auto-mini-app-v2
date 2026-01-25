import { Headline, Caption } from '@telegram-apps/telegram-ui';

import { STEPS_CONFIG } from '@/ApplicationWizard/steps/stepsConfig';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './Header.module.css';

export const Header = () => {
  const currentStep = useWizardStore((state) => state.step);
  const totalSteps = STEPS_CONFIG.length;

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <Caption weight="2" className={styles.counter}>
          ШАГ {currentStep} ИЗ {totalSteps}
        </Caption>
        <Headline weight="1">
          {STEPS_CONFIG.find((step) => step.id === currentStep)?.label}
        </Headline>
      </div>

      {/* Прогресс-бар */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </header>
  );
};
