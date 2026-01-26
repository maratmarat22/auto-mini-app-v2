import { useQuery } from '@tanstack/react-query';
import { Cell, List, Section, Spinner } from '@telegram-apps/telegram-ui';

import { autoApi } from '@/ApplicationWizard/api/getAutoInfo';
import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './AutoStep.module.css';

export const AutoStep = () => {
  const { data: wizardData, updateData } = useWizardStore();

  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });

  const { data: models, isLoading: modelsAreLoading } = useQuery({
    queryKey: ['models', wizardData.brand],
    queryFn: () => autoApi.getModels(wizardData.brand!),
    enabled: !!wizardData.brand,
  });

  if (brandsAreLoading || modelsAreLoading)
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size="m" className={styles.spinner} />
      </div>
    );

  return (
    <List>
      {!wizardData.brand ? (
        <Section header="Выберите марку">
          {brands!.map((b) => (
            <Cell
              key={b.id}
              onClick={() => updateData({ brand: b.id, model: null })} // Сбрасываем модель при выборе марки
            >
              {b.name}
            </Cell>
          ))}
        </Section>
      ) : (
        <Section header="Выберите модель">
          <Cell
            before="⬅️"
            onClick={() => updateData({ brand: null, model: null })}
          >
            Назад к маркам
          </Cell>
          {models!.map((m) => (
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
