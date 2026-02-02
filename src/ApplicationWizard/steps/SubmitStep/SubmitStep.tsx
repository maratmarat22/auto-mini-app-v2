import { Cell, List } from '@telegram-apps/telegram-ui';
import { MailQuestionMark } from 'lucide-react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import { StepHeader } from '../components/StepHeader';

export const SubmitStep = () => {
  const { application: wizardData } = useWizardStore();

  return (
    <div className="stepContainer">
      <StepHeader icon={MailQuestionMark} headline="Отправляем?">
        Ваша заявка:
      </StepHeader>
      <List>
        <Cell>{wizardData.auto.brand?.name}</Cell>
        <Cell>{wizardData.auto.model?.name}</Cell>
        <Cell>{wizardData.auto.generation?.name}</Cell>
        <Cell>{wizardData.auto.configuration?.name}</Cell>
        <Cell>{wizardData.auto.modification?.name}</Cell>
        <Cell>{wizardData.auto.bodyType?.name}</Cell>
        <Cell>{wizardData.auto.engineType?.name}</Cell>
        <Cell>{wizardData.auto.gearType?.name}</Cell>
        <Cell>{wizardData.auto.transmission?.name}</Cell>
      </List>
    </div>
  );
};
