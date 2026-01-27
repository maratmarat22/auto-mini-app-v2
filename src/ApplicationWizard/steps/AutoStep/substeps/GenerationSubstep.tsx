import { useQuery } from '@tanstack/react-query';
import {
  Cell,
  Input,
  List,
  Section,
  Spinner,
} from '@telegram-apps/telegram-ui';
import { useMemo, useState } from 'react';

import { autoApi } from '@/ApplicationWizard/api/getAutoInfo';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import type { WizardData } from '@/ApplicationWizard/types/wizard';

export const GenerationSubstep = ({
  onSelect,
}: {
  onSelect: (field: keyof WizardData, value: string, label: string) => void;
}) => {
  const { data: wizardData } = useWizardStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data, isLoading } = useQuery({
    queryKey: ['generations', wizardData.model],
    queryFn: () => autoApi.getGenerations(wizardData.model!.id),
    enabled: !!wizardData.model,
  });

  console.log(data);

  const generations = useMemo(() => {
    return data?.filter((g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, data]);

  if (isLoading)
    return (
      <div className="spinnerContainer">
        <Spinner size="m" />
      </div>
    );

  return (
    <List>
      <Input
        header="Поиск"
        placeholder={'Например, X5'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Section header="Выберите модель">
        {generations?.map((g) => (
          <Cell key={g.id} onClick={() => onSelect('generation', g.id, g.name)}>
            {g.name}
          </Cell>
        ))}
      </Section>
    </List>
  );
};
