import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueuePage } from './queue.page';

const routes: Routes = [
  {
    path: '',
    component: QueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueuePageRoutingModule {}
