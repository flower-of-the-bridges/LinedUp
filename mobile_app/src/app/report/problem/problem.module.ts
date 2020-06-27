import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProblemPageRoutingModule } from './problem-routing.module';

import { ProblemPage } from './problem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProblemPageRoutingModule
  ],
  declarations: [ProblemPage]
})
export class ProblemPageModule {}
