import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueuePageRoutingModule } from './queue-routing.module';

import { QueuePage } from './queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueuePageRoutingModule
  ],
  declarations: [QueuePage]
})
export class QueuePageModule {}
