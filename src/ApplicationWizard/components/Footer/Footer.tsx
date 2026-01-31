import { Button } from '@telegram-apps/telegram-ui';

import { STEPS_CONFIG } from '@/ApplicationWizard/steps/stepsConfig';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './Footer.module.css';

export const Footer = () => {
  const {
    step: currentStep,
    handleNextStep,
    handlePrevStep,
    onSubstep,
  } = useWizardStore();
  const currentStepConfig = STEPS_CONFIG[currentStep - 1];

  return (
    <footer>
      {(currentStepConfig.backButtonText || onSubstep) && (
        <Button
          onClick={handlePrevStep}
          mode="gray"
          className={styles.backButton}
        >
          {currentStepConfig.backButtonText ?? 'Back'}
        </Button>
      )}
      {!onSubstep && (
        <Button onClick={handleNextStep} className={styles.nextButton}>
          {currentStepConfig.nextButtonText ?? 'Next'}
        </Button>
      )}
    </footer>
  );
};
