import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [

  ]
})
export class GroupsModule { }
