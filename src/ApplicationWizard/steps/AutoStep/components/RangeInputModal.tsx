import {
  Modal,
  Input,
  Button,
  List,
  FixedLayout,
} from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { OctagonX } from 'lucide-react';
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

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        // Если фокус в инпуте, некоторые браузеры при закрытии клавиатуры
        // дергают open change. Проверяем, что это реальное закрытие.
        if (!open) onClose();
      }}
      header={<ModalHeader>{header}</ModalHeader>}
    >
      {/* Останавливаем всплытие тапов, чтобы модалка не думала, что кликнули по подложке */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <List>
          <div className={styles.inputRow}>
            <Input
              header="От"
              type="text" // Используем text + inputMode для стабильности
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
              type="text"
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

          {/* FixedLayout прижмет кнопки к нижней части видимой области (над клавиатурой) */}
          <FixedLayout vertical="bottom" className={styles.fixedFooter}>
            <div className={styles.footerButtons}>
              <Button size="l" stretched onClick={handleSave}>
                Применить
              </Button>
              <Button
                mode="bezeled"
                size="l"
                stretched
                onClick={() => {
                  setFrom('');
                  setTo('');
                }}
              >
                Сбросить
              </Button>
            </div>
          </FixedLayout>
        </List>
      </div>
    </Modal>
  );
};
