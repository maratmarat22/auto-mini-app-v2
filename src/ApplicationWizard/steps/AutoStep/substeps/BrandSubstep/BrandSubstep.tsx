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

export const BrandSubstep = ({
  onSelect,
}: {
  onSelect: (field: keyof WizardData, value: string) => void;
}) => {
  const { data: wizardData } = useWizardStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });
  const filteredBrands = useMemo(() => {
    return brands?.filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, brands]);

  if (brandsAreLoading)
    return (
      <div className="spinnerContainer">
        <Spinner size="m" />
      </div>
    );

  return (
    <List>
      <Input
        header="Поиск"
        placeholder={!wizardData.brand ? 'Например, BMW' : 'Например, X5'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Section header="Выберите марку">
        {filteredBrands?.map((b) => (
          <Cell key={b.id} onClick={() => onSelect('brand', b.name)}>
            {b.name}
          </Cell>
        ))}
      </Section>
    </List>
  );
};
