import React from 'react';
import { BrowserRouter, Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { Login } from '../login/login';
import { Layout } from '../layout/layout';
import { Backup } from '../backup/backup';
import { WithBackupslider } from '../backup/withSlider';
import { PrivateRoute } from './private.route';

const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="file" replace /> },
  {
    element: <PrivateRoute />, children: [
      {
        path: '/file', element: <Layout />, children: [
          {
            path: '', element: <WithBackupslider />, children: [
              { path: 'backup/:pathid?', element: <Backup /> },
              { path: 'resource', element: <div>资源库</div> },
            ]
          }
        ]
      },
      { path: '/album', element: <Layout />, },
      {
        path: '/application', element: <Layout />,
      },
    ]
  },
  { path: 'sign', element: <Login /> },
  { path: '*', element: <>not found page</>}
]


export function Router() {
  const routers = useRoutes(routes);
  return routers
}