import { Cell, Input, List, Section } from '@telegram-apps/telegram-ui';
import { useMemo, useState } from 'react';

import { CenterSpinner } from '@/ApplicationWizard/components/CenterSpinner/CenterSpinner';

import styles from './SelectSubstep.module.css';

import type { AutoField } from '../types/types';

interface SelectSubstepProps {
  list: { id: string; name: string }[] | undefined;
  isLoading: boolean;
  onSelect: (field: AutoField, value: { id: string; name: string }) => void;
  targetField: AutoField;
  header: string;
  placeholder: string;
}

export const SelectSubstep = ({
  list,
  isLoading,
  onSelect,
  targetField,
  placeholder,
  header,
}: SelectSubstepProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredList = useMemo(() => {
    return list?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, list]);

  if (isLoading) return <CenterSpinner />;

  return (
    <List className={styles.list}>
      <Input
        header="Поиск"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Section header={header}>
        {filteredList?.map((b) => (
          <Cell
            key={b.id}
            onClick={() => onSelect(targetField, { id: b.id, name: b.name })}
          >
            {b.name}
          </Cell>
        ))}
      </Section>
    </List>
  );
};
