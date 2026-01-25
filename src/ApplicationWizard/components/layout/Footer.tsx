import { Button } from '@telegram-apps/telegram-ui';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <Button mode="gray" className={styles.backButton}>
        Назад
      </Button>
      <Button className={styles.nextButton}>Далее</Button>
    </div>
  );
};
