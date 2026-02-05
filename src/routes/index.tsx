import type { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Test from '../pages/test';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test',
    element: <Test />,
  },
];
