import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingPage } from './building.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingPageRoutingModule {}
