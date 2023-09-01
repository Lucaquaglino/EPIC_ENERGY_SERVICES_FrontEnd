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
private urlFatturaFiltroStatoFattura = 'http://localhost:3001/fattura/filter/statoFattura';
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

  getClienteById(cliente: string): Observable<Clienti> {
    const url = `${this.urlClienti}/${cliente}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Clienti>(url, { headers });
  }

  getClientiRagioneSociale(page:number, pageSize:number, parteRagioneSociale:string): Observable<Clienti[]> {
    const params = new HttpParams()

    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('parteRagioneSociale', parteRagioneSociale.toString())
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(this.urlClientifiltroragionesociale, { params, headers })
      .pipe(map(response => response.content));
  }

  getFatturaByStatoFattura(page:number, pageSize:number, statoFattura:string): Observable<Fattura[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('parteRagioneSociale', statoFattura.toString())
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(this.urlFatturaFiltroStatoFattura, { params, headers })
      .pipe(map(response => response.content));
  }

  getFatturaByData(page:number, pageSize:number, dataFattura:string): Observable<Fattura[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('parteRagioneSociale', dataFattura.toString())
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>('http://localhost:3001/fattura/filter/data')
      .pipe(map(response => response.content));
  }

  getFatturaByAnno(page:number, pageSize:number, anno:number): Observable<Fattura[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('parteRagioneSociale', anno)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>('http://localhost:3001/fattura/filter/anno')
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


