import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { ApplicationWizard } from './ApplicationWizard';

// eslint-disable-next-line import/order
import { init, retrieveLaunchParams } from '@tma.js/sdk-react';

let lp;

try {
  init();
  lp = retrieveLaunchParams();
} catch (e) {
  console.error(e);
}

const platform = lp?.tgWebAppPlatform;
console.log(platform);
const queryClient = new QueryClient();
const ua = navigator.userAgent.toLowerCase();
const isMobile = /iphone|ipad|ipod|android/.test(ua);
const isIos = /iphone|ipad|ipod/.test(ua);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot platform={isIos ? 'ios' : 'base'}>
      <QueryClientProvider client={queryClient}>
        <ApplicationWizard isMobile={isMobile} />
      </QueryClientProvider>
    </AppRoot>
  </StrictMode>,
);
