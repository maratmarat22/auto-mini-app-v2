import { Modal, Input, Button, Section } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { OctagonX } from 'lucide-react'; // Для кнопки очистки
import { useState, useEffect } from 'react';

import styles from './RangeInputModal.module.css';

interface RangeInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (from: string, to: string) => void;
  initialFrom?: string;
  initialTo?: string;
  header: string;
  unit?: string; // Например, "л." или "л.с."
}

export const RangeInputModal = ({
  isOpen,
  onClose,
  onSave,
  initialFrom = '',
  initialTo = '',
  header,
  unit,
}: RangeInputModalProps) => {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  // Синхронизируем состояние при открытии
  useEffect(() => {
    if (isOpen) {
      setFrom(initialFrom);
      setTo(initialTo);
    }
  }, [isOpen, initialFrom, initialTo]);

  const handleSave = () => {
    onSave(from, to);
    onClose();
  };

  const handleClear = () => {
    setFrom('');
    setTo('');
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      header={<ModalHeader>{header}</ModalHeader>}
    >
      <div className={styles.modalContent}>
        <Section className={styles.inputsSection}>
          <div className={styles.inputRow}>
            <Input
              header="От"
              type="number"
              inputMode="decimal"
              placeholder={unit ? `0 ${unit}` : 'Минимум'}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              after={
                from && (
                  <OctagonX
                    size={20}
                    onClick={() => setFrom('')}
                    className={styles.clearIcon}
                  />
                )
              }
            />
            <div className={styles.separator} />
            <Input
              header="До"
              type="number"
              inputMode="decimal"
              placeholder={unit ? `500 ${unit}` : 'Максимум'}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              after={
                to && (
                  <OctagonX
                    size={20}
                    onClick={() => setTo('')}
                    className={styles.clearIcon}
                  />
                )
              }
            />
          </div>
        </Section>

        <div className={styles.footer}>
          <Button size="l" stretched onClick={handleSave}>
            Применить
          </Button>
          <Button mode="bezeled" size="l" stretched onClick={handleClear}>
            Сбросить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
