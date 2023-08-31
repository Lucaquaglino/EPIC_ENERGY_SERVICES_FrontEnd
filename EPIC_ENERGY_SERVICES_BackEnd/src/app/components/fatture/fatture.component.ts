import { Component, OnInit } from '@angular/core';
import { Fattura } from '../../models/fattura.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {

  fatture: Fattura[] = [];
  nuovaFattura: Fattura = {
    "id":"",
    "anno":null!,
    "data":"",
    "importo":null!,
    "statoFattura": "",
    "idCliente": "",
    "numeroFattura":"",
    "cliente": undefined
  }

  constructor(private FatturaService: AppService) { }

  ngOnInit(): void {
    this.loadFatture();
  }

  loadFatture() {
    this.FatturaService.getFatture(0, 'anno').subscribe(
      (response) => {
        console.log(response); // Controlla la risposta completa qui
        this.fatture = response;
      },
      (error) => {
        console.error("Error fetching fatture:", error);
      }
    );

  }

  creaNuovaFattura() {
    this.FatturaService.creaFattura(this.nuovaFattura).subscribe(
      (fatturaCreata: Fattura) => {
        console.log('Fattura creata:', fatturaCreata);
        // Resetta i campi della nuova fattura
        this.nuovaFattura = {
          "id":"",
          "anno":null!,
          "data":"",
          "importo":null!,
          "statoFattura": "",
          "idCliente": "",
          "numeroFattura":"",
          "cliente": undefined
      };
        // Ricarica la lista delle fatture dopo la creazione
        this.loadFatture();
      },
      (error) => {
        console.error('Errore durante la creazione della fattura:', error);
      }
    );
  }

}
