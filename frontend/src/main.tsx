// import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Welcome, Dashboard, Journal, Quests } from './screens';

import { Layout, Notification } from './components';
import { LoaderProvider, NotifyProvider } from './providers';

// TODO: handle login flow differently
// '/dashboard' should be '/'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/journal',
    element: <Journal />,
  },
  {
    path: '/quests/:id?',
    element: <Quests />,
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <LoaderProvider>
        <NotifyProvider>
          <Notification />
          <RouterProvider router={router} />
        </NotifyProvider>
      </LoaderProvider>
    </Layout>
  </React.StrictMode>
);
