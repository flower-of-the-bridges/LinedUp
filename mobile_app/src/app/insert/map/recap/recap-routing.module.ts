import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecapPage } from './recap.page';

const routes: Routes = [
  {
    path: '',
    component: RecapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecapPageRoutingModule {}
