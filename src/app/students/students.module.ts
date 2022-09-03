import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class StudentsModule { }
