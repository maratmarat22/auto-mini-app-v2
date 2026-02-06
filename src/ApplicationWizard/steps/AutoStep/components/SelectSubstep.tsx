import { Cell, Input, List, Section } from '@telegram-apps/telegram-ui';
import { Search, XCircle, Trash2, ChevronRight } from 'lucide-react'; // Импорты из Lucide
import { useMemo, useState } from 'react';

import { CenterSpinner } from '@/ApplicationWizard/components/CenterSpinner/CenterSpinner';

import styles from './SelectSubstep.module.css';

interface SelectSubstepProps {
  options: { id: string; name: string }[] | undefined;
  isLoading: boolean;
  onSelect: (prop: string, value: { id: string; name: string } | null) => void;
  propName: string;
  header: string;
  placeholder: string;
}

export const SelectSubstep = ({
  options,
  isLoading,
  onSelect,
  propName,
  placeholder,
  header,
}: SelectSubstepProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredList = useMemo(() => {
    return options?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, options]);

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
            onClick={() => onSelect(propName, null)}
          >
            <span className={styles.textDestructive}>Сбросить</span>
          </Cell>

          {filteredList?.map((b) => (
            <Cell
              key={b.id}
              hovered
              after={<ChevronRight size={16} className={styles.iconHint} />}
              onClick={() => onSelect(propName, { id: b.id, name: b.name })}
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
