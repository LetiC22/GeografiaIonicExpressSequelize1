import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


export class comunidades {
id: number;
nombre: string;
poblacion: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeografiaService {

  endpoint = 'http://localhost:8080/api/geografia';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpClient: HttpClient) { }

  getGeografia(){
    return this.httpClient.get(this.endpoint);
  }

  // createComunidades(comunidades: comunidades): Observable<any> {
  //   return this.httpClient.post<GeografiaService>(this.endpoint, JSON.stringify(comunidades), this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError<GeografiaService>('Error occured'))
  //     );
  // }

  getComunidad(id): Observable<comunidades[]> {
    return this.httpClient.get<comunidades[]>(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<comunidades[]>(`Get user id=${id}`))
      );
  }

  getComunidades(): Observable<comunidades[]> {
    return this.httpClient.get<comunidades[]>(this.endpoint)
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError<comunidades[]>('Get user', []))
      );
  }

  updateComunidades(id, comunidades: comunidades): Observable<any> {
    return this.httpClient.put(this.endpoint + '/' + id, JSON.stringify(comunidades), this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<comunidades[]>('Update user'))
      );
  }

  // updateComunidades(comunidades, blob){
  //   let formData = new FormData();
  //   //formData.append("id", comunidades.id);
  //   formData.append("nombre", comunidades.nombre);
  //   formData.append("poblacion", comunidades.poblacion);
  //   formData.append("file", blob);

  //   return this.httpClient.put(this.endpoint, formData);
  // }



  deleteComunidades(id){

    return this.httpClient.delete(this.endpoint + '/' + id);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  


  // DECOMMENT:
  createComunidades(comunidades, blob){
    let formData = new FormData();
    formData.append("nombre", comunidades.nombre);
    formData.append("poblacion", comunidades.poblacion);
    formData.append("file", blob);

    return this.httpClient.post(this.endpoint, formData);
  }


 }
