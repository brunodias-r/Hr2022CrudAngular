import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Teacher } from '../model/teacher';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  modalRef?: BsModalRef | null;
  public title = 'Professores';
  teachers$: Observable<Teacher[]>;
  public teacherSelected: Teacher | undefined;
  public teacherForm!: FormGroup;
  public textSimple!: string;
  displayedColumns = ['idStudent', 'name', 'idCourse'];
  modalService: any;

  constructor(
    private teachersService: TeachersService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    //this.teachersService = new TeachersService;
    this.teachers$ = this.teachersService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar os professores.');
          return of([])
        })
      ),
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
    this.loadTeacher();
  }

  loadTeacher(){
    this.teachersService.getAll().subscribe.caller(
      (teachers$: Teacher[]) => {
        teachers$ = teachers$;
      },
      (onError: any) => {
        console.error(this.onError);
      }
    );
  };

  createForm() {
    this.teacherForm = this.fb.group({
      idTeacher: [''],
      name: ['', Validators.required],
      idCourse: ['', Validators.required]
    });
  }

  /*Inserir*/
  saveCourse(teacher: Teacher) {
    this.teachersService.put(teacher.idCourse, teacher).subscribe(
      (teacher) => {
        console.log(teacher);
        this.loadTeacher();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  teacherSelect(teachers$: Teacher) {
    this.teacherSelected = teachers$;
    this.teacherForm?.patchValue(teachers$);
  }

  teacherSubmit() {
    console.log(this.teacherForm?.value);
  }

  fechar() {
    this.teacherSelected = undefined;
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
