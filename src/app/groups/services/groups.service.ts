import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  public baseUrl = `${environment.MainUrl}/api/Turmas`;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Group[]>(this.baseUrl)
    .pipe(
      first(),
      delay(1),
      tap(groups => console.log(groups))
    );
  }

    /*Select All*/
    getAll(): Observable<Group[]>{
      return this.httpClient.get<Group[]>(`${this.baseUrl}`);
    }

    /*Select by Id*/
    getById(idGroup: number): Observable<Group> {
      return this.httpClient.get<Group>(`${this.baseUrl}/${idGroup}`);
    }

    /*Insert Group*/
    post(course: Group){
      return this.httpClient.post(`${this.baseUrl}`,course);
    }

    /*Update */
    put(idCourse: number, course: Group){
      return this.httpClient.put(`${this.baseUrl}/${idCourse}`,course);
    }

    /*Delete */
      delete(idCourse: number) {
      return this.httpClient.delete(`${this.baseUrl}/${idCourse}`);
    }
}
