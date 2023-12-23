import { Route } from '@angular/router';
import DefaultLayoutComponent from './layouts/default-layout/default-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/user/user.component'),
      },
    ],
  },
];
