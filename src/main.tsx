import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { ApplicationWizard } from './ApplicationWizard';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot>
      <QueryClientProvider client={queryClient}>
        <ApplicationWizard />
      </QueryClientProvider>
    </AppRoot>
  </StrictMode>,
);
