import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Group } from '../model/group';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  modalRef?: BsModalRef | null;
  public title = 'Turmas';
  groups$: Observable<Group[]>;
  public groupSelected: Group | undefined;
  public textSimple!: string;
  public groupForm!: FormGroup;
  displayedColumns = ['idGroup', 'name', 'idCourse'];

  constructor(
    private groupsService: GroupsService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private modalService: BsModalService
  )  {
    this.groups$ = this.groupsService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar as turmas.');
        return of([])
      })
    );
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
    this.loadGroup();
  }

  loadGroup(){
    this.groupsService.getAll().subscribe.caller(
      (groups$: Group[]) => {
        groups$ = groups$;
      },
      (onError: any) => {
        console.error(this.onError);
      }
    );
  };

  createForm() {
    this.groupForm = this.fb.group({
      idGroup: [''],
      name: ['', Validators.required],
      idCourse: ['', Validators.required]
    });
  }

  /*Inserir*/
  saveGroup(group: Group){
      this.groupsService.put(group.idGroup, group).subscribe(
        (group) => {
          console.log(group);
          this.loadGroup();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

  groupSelect(groups$: Group){
    this.groupSelected = groups$;
    this.groupForm?.patchValue(groups$);
  }

  groupSubmit(){
    console.log(this.groupForm?.value);
  }

  fechar() {
    this.groupSelected = undefined;
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
