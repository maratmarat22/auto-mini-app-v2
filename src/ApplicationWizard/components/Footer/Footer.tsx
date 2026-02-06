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
    onModal,
    submitSuccessful,
  } = useWizardStore();
  const currentStepConfig = STEPS_CONFIG[currentStep - 1];
  const isLastStep = currentStep === STEPS_CONFIG.length;

  return (
    <footer>
      {(currentStepConfig.backButtonText || onSubstep || isLastStep) && (
        <Button
          onClick={handlePrevStep}
          disabled={onModal}
          mode="gray"
          className={styles.backButton}
        >
          {isLastStep
            ? submitSuccessful
              ? 'Отправить ещё'
              : 'Попробовать ещё раз'
            : (currentStepConfig.backButtonText ?? 'Back')}
        </Button>
      )}
      {!onSubstep && (
        <Button
          onClick={handleNextStep}
          disabled={onModal}
          className={styles.nextButton}
        >
          {currentStepConfig.nextButtonText ?? 'Next'}
        </Button>
      )}
    </footer>
  );
};
