import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapTutorial } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapTutorial
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPageRoutingModule {}
