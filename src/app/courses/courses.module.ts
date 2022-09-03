import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class CoursesModule { }
