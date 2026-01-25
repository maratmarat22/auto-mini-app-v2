import { Headline, Caption } from '@telegram-apps/telegram-ui';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './Header.module.css';

const STEP_NAMES = ['Бюджет', 'Выбор авто', 'Контакты'];

export const Header = () => {
  const step = useWizardStore((state) => state.step);
  const totalSteps = STEP_NAMES.length;

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <Caption weight="2" className={styles.counter}>
          ШАГ {step} ИЗ {totalSteps}
        </Caption>
        <Headline weight="1">{STEP_NAMES[step - 1]}</Headline>
      </div>

      {/* Прогресс-бар */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </header>
  );
};
