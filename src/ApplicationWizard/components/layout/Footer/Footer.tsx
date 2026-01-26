import { Button } from '@telegram-apps/telegram-ui';

import { STEPS_CONFIG } from '@/ApplicationWizard/steps/stepsConfig';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './Footer.module.css';

export const Footer = () => {
  const { step: currentStep, nextStep, prevStep, data } = useWizardStore();
  const currentStepConfig = STEPS_CONFIG.find((s) => s.id === currentStep);
  const nextStepAvailable = currentStepConfig?.isValid
    ? currentStepConfig.isValid(data)
    : true;

  return (
    <footer>
      {currentStep !== 1 && (
        <Button onClick={prevStep} mode="gray" className={styles.backButton}>
          {STEPS_CONFIG.find((step) => currentStep === step.id)
            ?.backButtonText ?? 'null'}
        </Button>
      )}
      <Button
        disabled={!nextStepAvailable}
        onClick={nextStep}
        className={styles.nextButton}
        mode={nextStepAvailable ? 'filled' : 'bezeled'}
      >
        {STEPS_CONFIG.find((step) => currentStep === step.id)?.nextButtonText ??
          'null'}
      </Button>
    </footer>
  );
};
