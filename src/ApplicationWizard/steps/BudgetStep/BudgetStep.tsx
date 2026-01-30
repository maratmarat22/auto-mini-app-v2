import {
  Headline,
  Subheadline,
  Input,
  Button,
  Text,
} from '@telegram-apps/telegram-ui';
import { RussianRuble, Wallet } from 'lucide-react';

import { useWizardStore } from '@/ApplicationWizard/store/useWizardStore';

import styles from './BudgetStep.module.css';

const budgetFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'decimal',
  maximumFractionDigits: 0,
});

const BUDGET_PRESETS = [
  { label: '500 000 ₽', value: 500000 },
  { label: '1.5 млн ₽', value: 1500000 },
  { label: '3 млн ₽', value: 3000000 },
  { label: '5 млн ₽', value: 5000000 },
];

export const BudgetStep = () => {
  const budget = useWizardStore((state) => state.data.budget);
  const updateData = useWizardStore((state) => state.updateData);

  const displayValue = budget ? budgetFormatter.format(budget) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numericValue = rawValue ? Number(rawValue) : 0;
    updateData({ budget: numericValue });
  };

  return (
    <div className="stepContainer">
      <div className="stepHeader">
        <div className="stepIcon">
          <Wallet size={32} />
        </div>
        <Headline weight="1">Планируемый бюджет</Headline>
        <Subheadline className="stepDesc">
          Укажите ваш бюджет. <br />
          <b>Расчет ведется строго в рублях (₽).</b>
        </Subheadline>
      </div>

      <div className={styles.inputWrapper}>
        <Input
          header="Ваш бюджет"
          type="text"
          inputMode="numeric"
          placeholder="Например, 1 500 000"
          value={displayValue}
          onChange={handleChange}
          className={styles.input}
          after={<RussianRuble size={20} className={styles.rubleIcon} />}
        />
      </div>

      <div className={styles.presetsSection}>
        <Text weight="2" className={styles.presetsLabel}>
          Быстрый выбор:
        </Text>
        <div className={styles.presetsGrid}>
          {BUDGET_PRESETS.map((preset) => (
            <Button
              key={preset.value}
              mode={budget === preset.value ? 'filled' : 'bezeled'}
              size="l"
              onClick={() => updateData({ budget: preset.value })}
              className={styles.presetBtn}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
