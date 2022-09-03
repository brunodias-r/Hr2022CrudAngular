import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http'
import { delay, first, Observable, take, tap } from 'rxjs';
import { getLocaleCurrencyCode } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  public baseUrl = `${environment.MainUrl}/api/Cursos`;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.baseUrl)
    .pipe(
      first(),
      delay(1),
      tap(courses => console.log(courses))
    );
  }

  /*Select All*/
  getAll(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(`${this.baseUrl}`);
  }

  /*Select by Id*/
  getById(idCourse: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseUrl}/${idCourse}`);
  }

  /*Insert course*/
  post(course: Course){
    return this.httpClient.post(`${this.baseUrl}`,course);
  }

  /*Update */
  put(idCourse: number, course: Course){
    return this.httpClient.put(`${this.baseUrl}/${idCourse}`,course);
  }

  /*Delete */
  delete(idCourse: number) {
    return this.httpClient.delete(`${this.baseUrl}/${idCourse}`);
  }
}
