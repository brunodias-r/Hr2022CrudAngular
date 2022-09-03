import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Student } from '../model/student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  modalRef?: BsModalRef | null;
  public title = 'Alunos';
  students$: Observable<Student[]>;
  public studentSelected: Student | undefined;
  public studentForm!: FormGroup;
  public textSimple!: string;
  //  displayedColumns = ['idStudent', 'name', 'idGroup'];

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    this.students$ = this.studentsService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar os alunos.');
          return of([])
        })
      );
    this.createForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  ngOnInit() {
    this.loadStudent();
  }

  loadStudent() {
    this.studentsService.getAll().subscribe.caller(
      (students$: Student[]) => {
        students$ = students$;
      },
      (onError: any) => {
        console.error(this.onError);
      }
    );
  };

  createForm() {
    this.studentForm = this.fb.group({
      idStudent: [''],
      name: ['', Validators.required],
      idGroup: ['', Validators.required],
    });
  }

  /*Inserir*/
  saveCourse(student: Student) {
    this.studentsService.put(student.idStudent, student).subscribe(
      (student) => {
        console.log(student);
        this.loadStudent();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  studentSelect(students$: Student) {
    this.studentSelected = students$;
    this.studentForm?.patchValue(students$);
  }

  studentSubmit() {
    console.log(this.studentForm?.value);
  }

  fechar() {
    this.studentSelected = undefined;
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
