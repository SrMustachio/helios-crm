import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.components').then(m => m.DashboardComponent),
      },
      {
        path: 'leads',
        loadComponent: () => import('./features/leads/leads.components').then(m => m.LeadsComponent),
      },
      {
        path: 'clients',
        loadComponent: () => import('./features/clients/clients.components').then(m => m.ClientsComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
