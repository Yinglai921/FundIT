import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import { HomeComponent }               from './home/home.component';
import { TestComponent }               from './test/test.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '**', redirectTo: '' },
  { path: 'test', component: TestComponent}
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
