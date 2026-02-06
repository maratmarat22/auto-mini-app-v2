import { useLaunchParams } from '@tma.js/sdk-react';

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

export const ApplicationWizard = () => {
  const step = useWizardStore((state) => state.step);
  const lp = useLaunchParams();
  const isMobile =
    lp.tgWebAppPlatform === 'ios' || lp.tgWebAppPlatform === 'android';

  // const isMobile = true;

  return (
    <div className={styles.mainContainer}>
      <div
        className={
          isMobile ? styles.headerContainerMobile : styles.headerContainer
        }
      >
        {/* lp.tgWebAppPlatform */}
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
