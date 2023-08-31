import { Component, OnInit } from '@angular/core';
import { Clienti } from 'src/app/models/clienti.interface';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
  clienti: Clienti[] = [];
  nuovoCliente: Clienti = {  "ragioneSociale": "",
  "partitaIva":"",
  "emailCliente":"",
  "pec":"",
  "telefonoCliente":0,
  "tipoCliente":"",
  "nomeContatto":"",
  "cognomeContatto":"",
  "emailContatto":"",
  "telefonoContatto":"",
  "viaUno":"",
  "civicoUno":0,
  "localitaUno":"",
  "capUno":"",
  "comuneUno":"",
  "viaDue":"",
  "civicoDue":0,
  "localitaDue":"",
  "capDue":"",
  "comuneDue":""

};

  constructor(private provinciaService: AppService) {}

  ngOnInit(): void {
    this.loadClienti();
  }

  loadClienti() {
    this.provinciaService.getClienti(0, 'ragioneSociale').subscribe(
      (clienti: Clienti[]) => {
        this.clienti = clienti;
      },
      (error) => {
        console.error('Error fetching province:', error);
      }
    );
  }


  creaNuovoCliente() {
    this.provinciaService.creaCliente(this.nuovoCliente).subscribe(
      (clienteCreato: Clienti) => {
        console.log('Cliente creato:', clienteCreato);
        // Resetta i campi del nuovo cliente
        this.nuovoCliente = {  "ragioneSociale": "",
        "partitaIva":"",
        "emailCliente":"",
        "pec":"",
        "telefonoCliente":0,
        "tipoCliente":"",
        "nomeContatto":"",
        "cognomeContatto":"",
        "emailContatto":"",
        "telefonoContatto":"",
        "viaUno":"",
        "civicoUno":0,
        "localitaUno":"",
        "capUno":"",
        "comuneUno":"",
        "viaDue":"",
        "civicoDue":0,
        "localitaDue":"",
        "capDue":"",
        "comuneDue":""

      };
        // Ricarica la lista dei clienti dopo la creazione
        this.loadClienti();
      },
      (error) => {
        console.error('Errore durante la creazione del cliente:', error);
      }
    );
  }
}








