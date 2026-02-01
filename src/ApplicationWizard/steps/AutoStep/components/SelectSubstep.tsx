import { Cell, Input, List, Section } from '@telegram-apps/telegram-ui';
import { Search, XCircle, Trash2, ChevronRight } from 'lucide-react'; // Импорты из Lucide
import { useMemo, useState } from 'react';

import { CenterSpinner } from '@/ApplicationWizard/components/CenterSpinner/CenterSpinner';

import styles from './SelectSubstep.module.css';

import type { AutoProp } from '../types/prop&substep';

interface SelectSubstepProps {
  list: { id: string; name: string }[] | undefined;
  isLoading: boolean;
  onSelect: (field: AutoProp, value: { id: string; name: string } | null) => void;
  targetField: AutoProp;
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
    return list?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, list]);

  if (isLoading) return <CenterSpinner />;

  return (
    <div className={styles.container}>
      <List>
        <Section>
          <Input
            header="Поиск"
            before={<Search size={20} className={styles.iconHint} />}
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            after={
              searchQuery && (
                <XCircle
                  size={20}
                  onClick={() => setSearchQuery('')}
                  className={styles.clickableIcon}
                />
              )
            }
          />
        </Section>

        <Section header={header}>
          {/* Кнопка сброса с иконкой корзины Lucide */}
          <Cell
            before={<Trash2 size={20} className={styles.iconDestructive} />}
            onClick={() => onSelect(targetField, null)}
          >
            <span className={styles.textDestructive}>Очистить выбор</span>
          </Cell>

          {filteredList?.map((b) => (
            <Cell
              key={b.id}
              hovered
              after={<ChevronRight size={16} className={styles.iconHint} />}
              onClick={() => onSelect(targetField, { id: b.id, name: b.name })}
            >
              {b.name}
            </Cell>
          ))}

          {filteredList?.length === 0 && (
            <Cell subhead="Ничего не найдено" readOnly>
              Попробуйте другой запрос
            </Cell>
          )}
        </Section>
      </List>
    </div>
  );
};
