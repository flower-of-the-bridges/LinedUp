import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniversityPage } from './university.page';

const routes: Routes = [
  {
    path: '',
    component: UniversityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversityPageRoutingModule {}
