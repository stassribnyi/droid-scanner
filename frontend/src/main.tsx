import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { Welcome, Dashboard, MyCollection, Hint } from './screens';

import { Layout, Notification } from './components';
import { LoaderProvider, NotifyProvider } from './providers';

// TODO: use variable
// axios.defaults.baseURL = 'http://hack.brightgrove.com:8080';

const memoryRouter = createMemoryRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/my-collection',
    element: <MyCollection />,
  },
  {
    path: '/hint/:id?',
    element: <Hint />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <LoaderProvider>
        <NotifyProvider>
          <Notification />
          <RouterProvider router={memoryRouter} />
        </NotifyProvider>
      </LoaderProvider>
    </Layout>
  </React.StrictMode>
);
