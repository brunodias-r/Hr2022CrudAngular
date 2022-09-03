import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers/teachers.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class TeachersModule { }
