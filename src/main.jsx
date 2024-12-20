import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence } from 'framer-motion';

import { AppProvider } from './contexts/app.context.jsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0
        }
    }
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AnimatePresence>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <AppProvider>
                        <App />
                    </AppProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </BrowserRouter>
        </AnimatePresence>
    </StrictMode>
);
