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

import styles from './AutoStep.module.css';

export const AutoStep = () => {
  const { data: wizardData, updateData } = useWizardStore();
  const [searchQuery, setSearchQuery] = useState<string>('');

  //: Loading data
  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });
  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: ['models', wizardData.brand],
    queryFn: () => autoApi.getModels(wizardData.brand!),
    enabled: !!wizardData.brand,
  });

  //: Normalization
  const filteredItems = useMemo(() => {
    const currentList = !wizardData.brand ? brands : models;
    return currentList?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, brands, models, wizardData.brand]);

  if (brandsAreLoading || modelsAreLoading)
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size="m" className={styles.spinner} />
      </div>
    );

  return (
    <List>
      <Input
        header="Поиск"
        placeholder={!wizardData.brand ? 'Например, BMW' : 'Например, X5'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.autoInput}
      />

      {!wizardData.brand ? (
        <Section header="Выберите марку">
          {filteredItems!.map((b) => (
            <Cell
              key={b.id}
              onClick={() => {
                updateData({ brand: b.id, model: null });
                setSearchQuery('');
              }}
            >
              {b.name}
            </Cell>
          ))}
        </Section>
      ) : (
        <Section header="Выберите модель">
          <Cell
            before="⬅️"
            onClick={() => {
              updateData({ brand: null, model: null });
              setSearchQuery('');
            }}
          >
            Назад к маркам
          </Cell>
          {filteredItems!.map((m) => (
            <Cell
              key={m.id}
              after={wizardData.model === m.id ? '✅' : null}
              onClick={() => updateData({ model: m.id })}
            >
              {m.name}
            </Cell>
          ))}
        </Section>
      )}
    </List>
  );
};
