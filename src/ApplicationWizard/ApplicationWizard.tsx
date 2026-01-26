import styles from './ApplicationWizard.module.css';
import { Footer, Header } from './components';
import { AutoStep, BudgetStep, HeroStep } from './steps';
import { useWizardStore } from './store/useWizardStore';

export const ApplicationWizard = ({ isMobile }: { isMobile: boolean }) => {
  const step = useWizardStore((state) => state.step);

  return (
    <div className={styles.mainContainer}>
      <div
        className={
          isMobile ? styles.headerContainerMobile : styles.headerContainer
        }
      >
        <Header isMobile={isMobile} />
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
