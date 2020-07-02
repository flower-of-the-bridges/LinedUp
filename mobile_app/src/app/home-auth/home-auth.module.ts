import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAuthPageRoutingModule } from './home-auth-routing.module';

import { HomeAuthPage } from './home-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAuthPageRoutingModule
  ],
  declarations: [HomeAuthPage]
})
export class HomeAuthPageModule {}
