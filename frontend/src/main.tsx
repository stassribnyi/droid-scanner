import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider, AxiosInterceptors, Layout, ProtectedRoute } from './components';
import { JoinUs, Dashboard, Journal, Quests } from './screens';
import { LoaderProvider, NotifyProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <LoaderProvider>
        <NotifyProvider>
          <AxiosInterceptors>
            <Router>
              <AuthProvider>
                <Routes>
                  <Route element={<ProtectedRoute allowed="auth-only" navigateTo="join-us" />}>
                    <Route index element={<Dashboard />} />
                    <Route path="quests" element={<Quests />} />
                    <Route path="journal" element={<Journal />} />
                  </Route>
                  <Route element={<ProtectedRoute allowed="login-only" navigateTo="/" />}>
                    <Route path="join-us" element={<JoinUs />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </AuthProvider>
            </Router>
          </AxiosInterceptors>
        </NotifyProvider>
      </LoaderProvider>
    </Layout>
  </React.StrictMode>,
);
