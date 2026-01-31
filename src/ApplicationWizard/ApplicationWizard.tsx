import styles from './ApplicationWizard.module.css';
import { Footer, Header } from './components';
import {
  AutoStep,
  BudgetStep,
  CommentStep,
  HeroStep,
  SubmitStatusStep,
  SubmitStep,
} from './steps';
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
        {step === 3 && <CommentStep isMobile={isMobile} />}
        {step === 4 && <BudgetStep isMobile={isMobile} />}
        {step === 5 && <SubmitStep />}
        {step === 6 && <SubmitStatusStep />}
      </main>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};
