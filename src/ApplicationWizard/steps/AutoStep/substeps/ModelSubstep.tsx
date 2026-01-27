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

export const ModelSubstep = ({
  onSelect,
}: {
  onSelect: (field: keyof WizardData, value: string, label: string) => void;
}) => {
  const { data: wizardData } = useWizardStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: ['models', wizardData.brand],
    queryFn: () => autoApi.getModels(wizardData.brand!.id),
    enabled: !!wizardData.brand,
  });

  console.log(models);

  const filteredModels = useMemo(() => {
    return models?.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, models]);

  if (modelsAreLoading)
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
        {filteredModels?.map((m) => (
          <Cell key={m.id} onClick={() => onSelect('model', m.id, m.name)}>
            {m.name}
          </Cell>
        ))}
      </Section>
    </List>
  );
};
