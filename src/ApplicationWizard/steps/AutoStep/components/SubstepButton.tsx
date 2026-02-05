import { Button } from '@telegram-apps/telegram-ui';
import { CircleArrowRight, CircleCheck } from 'lucide-react';

import styles from './SubstepButton.module.css';

interface SelectSubstepButtonProps {
  value: { id: string; name: string } | null;
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export const SelectSubstepButton = ({
  value,
  onClick,
  text,
  disabled = false,
}: SelectSubstepButtonProps) => {
  return (
    <Button
      className={styles.button}
      disabled={disabled}
      after={value ? <CircleCheck size={20} /> : <CircleArrowRight size={20} />}
      mode={value ? 'filled' : 'bezeled'}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

interface RangeInputSubstepButtonProps {
  fromValue: number | null;
  toValue: number | null;
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export const RangeInputSubstepButton = ({
  fromValue,
  toValue,
  onClick,
  text,
  disabled = false,
}: RangeInputSubstepButtonProps) => {
  return (
    <Button
      className={styles.button}
      disabled={disabled}
      after={
        fromValue || toValue ? (
          <CircleCheck size={20} />
        ) : (
          <CircleArrowRight size={20} />
        )
      }
      mode={fromValue || toValue ? 'filled' : 'bezeled'}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
