import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'table',
    loadComponent: ()=> import('../app/pages/table/table.component').then(m => m.TableComponent)
  },
  {
    path: 'form',
    loadComponent: ()=> import('../app/pages/form/form.component').then(m => m.FormComponent)
  },
];
