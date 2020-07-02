import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAuthPage } from './home-auth.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAuthPageRoutingModule {}
