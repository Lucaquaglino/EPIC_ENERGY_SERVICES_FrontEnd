import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clienti } from '../models/clienti.interface';
import { map } from 'rxjs';
import { Fattura } from '../models/fattura.interface';
@Injectable({
  providedIn: 'root',
})
export class AppService {

  private urlClienti = 'http://localhost:3001/clienti'; // Controlla l'URL del backend
private urlClientifiltroragionesociale='http://localhost:3001/clienti/filter/ragioneSociale';
  constructor(private http: HttpClient) { }

getClienti(page:Number, order:string): Observable<Clienti[]> {
  const params = new HttpParams()

  .set('page', page.toString())
  .set('order', order)
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.get<any>(this.urlClienti, { params, headers })
    .pipe(map(response => response.content));
}

creaCliente(cliente: Clienti): Observable<Clienti> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.post<Clienti>(this.urlClienti, cliente, { headers });
}
// ------------------------------------------------------ Fattura

private urlFattura = 'http://localhost:3001/fattura';

// creaFattura(fattura: Fattura): Observable<Fattura>{
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`
//   });
//   return this.http.post<Fattura>(this.urlFattura, fattura, { headers });
//  }

creaFattura(fattura: Fattura, clienteId: string): Observable<Fattura> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  // Aggiungi il parametro clienteId all'URL
  const urlWithParams = `${this.urlFattura}?clienteId=${clienteId}`;

  return this.http.post<Fattura>(urlWithParams, fattura, { headers });
}


 getFatture(page: number, order: string): Observable<Fattura[]> {
   const params = new HttpParams()
   .set('page', page.toString())
   .set('order', order);

   const headers = new HttpHeaders({
     Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(this.urlFattura, { params, headers })
    .pipe(map(response => response.content));
  }

  getFatturaById(fattura: string): Observable<Fattura> {
    const url = `${this.urlFattura}/${fattura}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Fattura>(url, { headers });
  }



  getClientiRagioneSociale(page:number, pageSize:number, parteRagioneSociale:string): Observable<Clienti[]> {
    const params = new HttpParams()

    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('parteRagioneSociale', parteRagioneSociale)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(this.urlClientifiltroragionesociale, { params, headers })
      .pipe(map(response => response.content));
  }




  deleteCliente(id: string): Observable<Clienti[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const url = `${this.urlClienti}/${id}`;

    return this.http.delete<any>(url, { headers });
  }
  deleteFattura(id: string): Observable<Fattura[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const url = `${this.urlFattura}/${id}`;

    return this.http.delete<any>(url, { headers });
  }
}


