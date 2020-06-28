import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertPage } from './insert.page';

const routes: Routes = [
  {
    path: '',
    component: InsertPage
  },
  {
    path: 'building',
    loadChildren: () => import('./building/building.module').then( m => m.BuildingPageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertPageRoutingModule {}
