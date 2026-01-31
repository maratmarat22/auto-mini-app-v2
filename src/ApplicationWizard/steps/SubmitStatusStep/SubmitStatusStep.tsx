import { MailCheck, MailX } from 'lucide-react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './SubmitStatusStep.module.css';
import { StepHeader } from '../components/StepHeader';

export const SubmitStatusStep = () => {
  const { submitSuccessful } = useWizardStore();

  return (
    <div className="stepContainer">
      <StepHeader
        icon={submitSuccessful ? MailCheck : MailX}
        iconClassName={submitSuccessful ? styles.success : styles.fail}
        headline={submitSuccessful ? 'Мы получили Вашу заявку' : 'Ошибка'}
      >
        sample
      </StepHeader>
    </div>
  );
};
