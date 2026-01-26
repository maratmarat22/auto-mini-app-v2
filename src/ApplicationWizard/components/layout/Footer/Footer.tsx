import { Button } from '@telegram-apps/telegram-ui';

import { STEPS_CONFIG } from '@/ApplicationWizard/steps/stepsConfig';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './Footer.module.css';

export const Footer = () => {
  const {
    step: currentStep,
    nextStep,
    prevStep,
    data,
    onSubstep,
  } = useWizardStore();
  const currentStepConfig = STEPS_CONFIG[currentStep - 1];
  const isDataValid = currentStepConfig.isValid(data);
  const canGoNext = isDataValid && !onSubstep;

  return (
    <footer>
      {(currentStep !== 1 || onSubstep) && (
        <Button onClick={prevStep} mode="gray" className={styles.backButton}>
          {currentStepConfig.backButtonText ?? 'Back'}
        </Button>
      )}
      {!onSubstep && (
        <Button
          disabled={!canGoNext}
          onClick={nextStep}
          className={styles.nextButton}
          mode={canGoNext ? 'filled' : 'bezeled'}
        >
          {currentStepConfig.nextButtonText ?? 'Next'}
        </Button>
      )}
    </footer>
  );
};
