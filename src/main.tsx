import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { ApplicationWizard } from './ApplicationWizard';

// eslint-disable-next-line import/order
import { init, retrieveLaunchParams, postEvent } from '@tma.js/sdk-react';

let lp;
export let handleClose: () => void = () => {};

try {
  init();
  lp = retrieveLaunchParams();
  handleClose = () => {
    try {
      postEvent('web_app_close');
    } catch (error) {
      console.error('Ошибка при отправке ивента закрытия:', error);
    }
  };
} catch (e) {
  console.error(e);
}

const platform = lp?.tgWebAppPlatform === 'ios' ? 'ios' : 'base';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot platform={platform}>
      <QueryClientProvider client={queryClient}>
        <ApplicationWizard />
      </QueryClientProvider>
    </AppRoot>
  </StrictMode>,
);
