import { Button } from '@telegram-apps/telegram-ui';
import { CircleArrowRight, CircleCheck } from 'lucide-react';

import styles from './SubstepButton.module.css';

interface SubstepButtonProps {
  value: { id: string; name: string } | null;
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export const SubstepButton = ({
  value: target,
  onClick,
  text,
  disabled = false,
}: SubstepButtonProps) => {
  return (
    <Button
      className={styles.button}
      disabled={disabled}
      after={
        target ? <CircleCheck size={20} /> : <CircleArrowRight size={20} />
      }
      mode={target ? 'filled' : 'bezeled'}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
