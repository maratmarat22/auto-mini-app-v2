import { Button } from '@telegram-apps/telegram-ui';

import { STEPS_CONFIG } from '@/ApplicationWizard/steps/stepsConfig';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './Footer.module.css';

export const Footer = () => {
  const currentStep = useWizardStore((state) => state.step);
  const nextStep = useWizardStore((state) => state.nextStep);
  const prevStep = useWizardStore((state) => state.prevStep);

  return (
    <div className={styles.footer}>
      {currentStep !== 1 && (
        <Button onClick={prevStep} mode="gray" className={styles.backButton}>
          {STEPS_CONFIG.find((step) => currentStep === step.id)
            ?.backButtonText ?? 'null'}
        </Button>
      )}
      <Button onClick={nextStep} className={styles.nextButton}>
        {STEPS_CONFIG.find((step) => currentStep === step.id)?.nextButtonText ??
          'null'}
      </Button>
    </div>
  );
};
