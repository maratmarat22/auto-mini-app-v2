import styles from './ApplicationWizard.module.css';
import { Footer, Header } from './components';
import { BudgetStep } from './steps';

export const ApplicationWizard = () => {
  return (
    <main>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.stepContainer}>
        <BudgetStep />
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </main>
  );
};
