import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups/groups.component';
import { LoginComponent } from './login/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TitleComponent } from './shared/components/title/title.component';
import { SharedModule } from './shared/shared.module';
import { StudentsComponent } from './students/students/students.component';
import { TeachersComponent } from './teachers/teachers/teachers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    DashboardComponent,
    CoursesComponent,
    GroupsComponent,
    StudentsComponent,
    TeachersComponent,
    TitleComponent,
    LoginComponent,
  ],
  imports: [
    BsDropdownModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
