import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: 'courses', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  { path: 'students', pathMatch: 'full', redirectTo: 'students' },
  { path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
  { path: 'groups', pathMatch: 'full', redirectTo: 'groups' },
  { path: 'groups',
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
  },
  { path: 'teachers', pathMatch: 'full', redirectTo: 'teachers' },
  { path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)
  },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
