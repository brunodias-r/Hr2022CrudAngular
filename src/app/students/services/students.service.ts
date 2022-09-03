import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public baseUrl = `${environment.MainUrl}/api/Alunos`;

  //private readonly API = '/assets/students.json';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Student[]>(this.baseUrl)
      .pipe(
        first(),
        delay(1),
        tap(students => console.log(students))
      );
  }

  /*Select All*/
  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseUrl}`);
  }

  /*Select by Id*/
  getById(idStudent: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl}/${idStudent}`);
  }

  /*Insert Student*/
  post(student: Student) {
    return this.httpClient.post(`${this.baseUrl}`, student);
  }

  /*Update */
  put(idStudent: number, student: Student) {
    return this.httpClient.put(`${this.baseUrl}/${idStudent}`, student);
  }

  /*Delete */
  delete(idCourse: number) {
    return this.httpClient.delete(`${this.baseUrl}/${idCourse}`);
  }
}
