import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, of } from 'rxjs';
import { Group } from 'src/app/groups/model/group';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  modalRef?: BsModalRef | null;
  public title = 'Cursos';
  public courses$!: Observable<Course[]>;
  public courseSelected: Course | undefined;
  public textSimple!: string;
  public courseForm!: FormGroup;
  public courses!: Course[];
  // displayedColumns = [ 'idCourse', 'name'];

  constructor (
    private coursesService: CoursesService,

    public dialog: MatDialog,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) {
    // this.courses$ = this.coursesService.list()
    // .pipe(
    //   catchError(error => {
    //     this.onError('Erro ao carregar os cursos.');
    //     return of([])
    //   })
    // );
    this.createForm();
  }

  openModal(template: TemplateRef<Group>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  ngOnInit() {
    this.loadCourse();
  }

  loadCourse(){
    this.coursesService.getAll().subscribe.caller(
      (courses$: Course[]) => {
        courses$ = courses$;
      },
      (onError: any) => {
        console.error(this.onError);
      }
    );
  };

  createForm() {
    this.courseForm = this.fb.group({
      idCourse: [''],
      name: ['', Validators.required]
    });
  }

  /*Inserir*/
  saveCourse(course: Course){
    this.coursesService.put(course.idCourse, course).subscribe(
      (course) => {
        console.log(course);
        this.loadCourse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  courseSelect(courses$: Course) {
    this.courseSelected = courses$;
    this.courseForm?.patchValue(courses$);
  }

  courseSubmit(){
    this.saveCourse(this.courseForm?.value);
  }

  fechar() {
    this.courseSelected = undefined;
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
