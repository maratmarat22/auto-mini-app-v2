import { Cell, List } from '@telegram-apps/telegram-ui';
import { MailQuestionMark } from 'lucide-react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import { StepHeader } from '../components/StepHeader';

export const SubmitStep = () => {
  const { data: wizardData } = useWizardStore();

  return (
    <div className="stepContainer">
      <StepHeader icon={MailQuestionMark} headline="Отправляем?">
        Ваша заявка:
      </StepHeader>
      <List>
        <Cell>{wizardData.brand?.name}</Cell>
      </List>
    </div>
  );
};
