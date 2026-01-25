import { Headline, Input, Button } from '@telegram-apps/telegram-ui';

import { useWizardStore } from '../store/useWizardStore';

const budgetFormatter = new Intl.NumberFormat('ru-Ru', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const BUDGET_PRESETS = [
  { label: '500к', value: 500000 },
  { label: '1.5м', value: 1500000 },
  { label: '3м', value: 3000000 },
  { label: '5м', value: 5000000 },
];

export const BudgetStep = () => {
  const budget = useWizardStore((state) => state.data.budget);
  const updateData = useWizardStore((state) => state.updateData);

  const formattedBudget = budgetFormatter.format(budget);

  return (
    <div>
      <header>
        <Headline>Какой у вас бюджет?</Headline>
      </header>

      <div>
        <Headline>{formattedBudget}</Headline>
      </div>

      <Input
        header="Сумма в рублях"
        type="number"
        inputMode="numeric"
        placeholder="Например, 1 000 000"
        value={budget || ''}
        onChange={(e) => updateData({ budget: Number(e.target.value) })}
      />

      {/* Сетка пресетов (быстрый выбор) */}
      <div>
        {BUDGET_PRESETS.map((preset) => (
          <Button
            key={preset.value}
            mode={budget === preset.value ? 'filled' : 'bezeled'}
            size="m"
            onClick={() => updateData({ budget: preset.value })}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
