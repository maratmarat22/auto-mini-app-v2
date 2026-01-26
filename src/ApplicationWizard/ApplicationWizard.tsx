import styles from './ApplicationWizard.module.css';
import { Footer, Header } from './components';
import { AutoStep, BudgetStep, HeroStep } from './steps';
import { useWizardStore } from './store/useWizardStore';

export const ApplicationWizard = () => {
  const step = useWizardStore((state) => state.step);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <main>
        {step === 1 && <HeroStep />}
        {step === 2 && <AutoStep />}
        {step === 3 && <BudgetStep />}
      </main>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};
