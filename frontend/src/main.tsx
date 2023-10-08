import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { Welcome, Dashboard, Scanner, MyCollection, Hint } from './screens';

import { Layout } from './components';

const memoryRouter = createMemoryRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/scan',
    element: <Scanner />,
  },
  {
    path: '/my-collection',
    element: <MyCollection />,
  },
  {
    path: '/hint',
    element: <Hint />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={memoryRouter} />
    </Layout>
  </React.StrictMode>
);
