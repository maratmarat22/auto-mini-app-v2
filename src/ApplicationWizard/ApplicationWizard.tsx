import styles from './ApplicationWizard.module.css';
import { Footer, Header } from './components';
import { BudgetStep, HeroStep } from './steps';
import { useWizardStore } from './store/useWizardStore';

export const ApplicationWizard = () => {
  const step = useWizardStore((state) => state.step);

  return (
    <main>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.stepContainer}>
        {step === 1 && <HeroStep />}
        {step === 2 && <BudgetStep />}
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </main>
  );
};
