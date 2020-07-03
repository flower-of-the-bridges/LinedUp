import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestPage } from './request.page';

const routes: Routes = [
  {
    path: '',
    component: RequestPage
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPageRoutingModule {}
