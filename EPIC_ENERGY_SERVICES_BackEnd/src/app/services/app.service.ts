import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clienti } from '../models/clienti.interface';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {

  private baseUrl = 'http://localhost:3001/clienti'; // Controlla l'URL del backend

  constructor(private http: HttpClient) { }

  getClienti(page: number, order: string): Observable<Clienti[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('order', order);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(this.baseUrl, { params, headers })
      .pipe(map(response => response.content));
  }



  getProvinciaById(provincia: string): Observable<Clienti> {
    const url = `${this.baseUrl}/${provincia}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Clienti>(url, { headers });
  }



creaCliente(cliente: Clienti): Observable<Clienti> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.post<Clienti>(this.baseUrl, cliente, { headers });
}
}

//   //CHIAMATA POST PER METTERE FILM NEI PREFERITI
//   aggiungiFavorites(data: Favorites) {
//     return this.http.post<Favorites>('http://localhost:4201/favorites', data);
//   }
//   // CHIAMATA DELETE PER ELEMINARE FILM DAI PREFERITI
//   eliminaFavorites(favoriteID: number) {
//     return this.http.delete(`http://localhost:4201/favorites/${favoriteID}`);
//   }
// //CHIAMATA GET PER INFO FILM SPECIFICO
//   getFilmById(id: number) {
//     return this.http.get<Movies[]>(`http://localhost:4201/movies-popular/${id}`);
//   }



