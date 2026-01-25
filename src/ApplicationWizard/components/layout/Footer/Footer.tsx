import { Button } from '@telegram-apps/telegram-ui';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './Footer.module.css';

export const Footer = () => {
  const step = useWizardStore((state) => state.step);
  const nextStep = useWizardStore((state) => state.nextStep);
  const prevStep = useWizardStore((state) => state.prevStep);

  return (
    <div className={styles.footer}>
      {step !== 1 && (
        <Button onClick={prevStep} mode="gray" className={styles.backButton}>
          Назад
        </Button>
      )}
      <Button onClick={nextStep} className={styles.nextButton}>
        Далее
      </Button>
    </div>
  );
};
