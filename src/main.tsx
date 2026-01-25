import { AppRoot } from '@telegram-apps/telegram-ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { ApplicationWizard } from './ApplicationWizard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot platform="ios">
      <ApplicationWizard />
    </AppRoot>
  </StrictMode>,
);
