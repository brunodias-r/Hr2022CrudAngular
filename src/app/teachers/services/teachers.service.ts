import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  public baseUrl = `${environment.MainUrl}/api/Professores`;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Teacher[]>(this.baseUrl)
    .pipe(
      first(),
      delay(1),
      tap(teachers => console.log(teachers))
    );
  }

   /*Select All*/
   getAll(): Observable<Teacher[]>{
    return this.httpClient.get<Teacher[]>(`${this.baseUrl}`);
  }

  /*Select by Id*/
  getById(idTeacher: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(`${this.baseUrl}/${idTeacher}`);
  }

  /*Insert teacher*/
  post(teacher: Teacher){
    return this.httpClient.post(`${this.baseUrl}`,teacher);
  }

  /*Update */
  put(idTeacher: number, teacher: Teacher){
    return this.httpClient.put(`${this.baseUrl}/${idTeacher}`,teacher);
  }

  /*Delete */
  delete(idTeacher: number) {
    return this.httpClient.delete(`${this.baseUrl}/${idTeacher}`);
  }
}
