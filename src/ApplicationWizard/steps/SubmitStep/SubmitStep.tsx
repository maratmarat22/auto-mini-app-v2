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
        <Cell>{wizardData.specificAutoData.brand?.name}</Cell>
        <Cell>{wizardData.specificAutoData.model?.name}</Cell>
        <Cell>{wizardData.specificAutoData.generation?.name}</Cell>
        <Cell>{wizardData.specificAutoData.configuration?.name}</Cell>
        <Cell>{wizardData.specificAutoData.modification?.name}</Cell>
        {/* <Cell>{wizardData.specificAutoData.bodyType?.name}</Cell>
        <Cell>{wizardData.specificAutoData.engineType?.name}</Cell>
        <Cell>{wizardData.specificAutoData.gearType?.name}</Cell>
        <Cell>{wizardData.specificAutoData.transmission?.name}</Cell> */}
      </List>
    </div>
  );
};
