import { Spinner } from '@telegram-apps/telegram-ui';

import styles from './CenterSpinner.module.css';

export const CenterSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner size="m" />
    </div>
  );
};
