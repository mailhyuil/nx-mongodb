import { Route } from '@angular/router';
import DefaultLayoutComponent from './layouts/default-layout/default-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      {
        path: 'user',
        loadComponent: () => import('./pages/user/user.component'),
      },
      {
        path: 'post',
        loadComponent: () => import('./pages/post/post.component'),
      },
    ],
  },
];
