import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecapPageRoutingModule } from './recap-routing.module';

import { RecapPage } from './recap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecapPageRoutingModule
  ],
  declarations: [RecapPage]
})
export class RecapPageModule {}
