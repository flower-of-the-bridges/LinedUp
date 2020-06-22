import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UniversityPageRoutingModule } from './university-routing.module';

import { UniversityPage } from './university.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversityPageRoutingModule
  ],
  declarations: [UniversityPage]
})
export class UniversityPageModule {}
