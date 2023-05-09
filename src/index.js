import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './themed-bootstrap.scss'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextWrapper } from './contexts/DarkModeContext'
import { AuthContextProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BlogContextProvider } from './contexts/BlogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        <BlogContextProvider>
            <AuthContextProvider>
                <DarkModeContextWrapper>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </DarkModeContextWrapper>
            </AuthContextProvider>
        </BlogContextProvider>
    </QueryClientProvider>
);

reportWebVitals();
