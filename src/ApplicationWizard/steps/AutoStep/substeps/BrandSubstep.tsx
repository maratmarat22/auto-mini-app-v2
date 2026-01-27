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

import styles from './BrandSubstep.module.css';

import type { WizardData } from '@/ApplicationWizard/types/wizard';

export const BrandSubstep = ({
  onSelect,
}: {
  onSelect: (field: keyof WizardData, value: string, label: string) => void;
}) => {
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
    <List className={styles.list}>
      <Input
        header="Поиск"
        placeholder={'Например, BMW'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Section header="Выберите марку">
        {filteredBrands?.map((b) => (
          <Cell key={b.id} onClick={() => onSelect('brand', b.id, b.name)}>
            {b.name}
          </Cell>
        ))}
      </Section>
    </List>
  );
};
