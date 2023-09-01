import { Component, OnInit } from '@angular/core';
import { Fattura } from '../../models/fattura.interface';
import { AppService } from 'src/app/services/app.service';
import { FormsModule } from '@angular/forms';
import { Clienti } from 'src/app/models/clienti.interface';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {
  showAggiungiForm: boolean = false;
  page = 0;
  pageSize = 10;
  idCliente = "";
  statoFattura = "";
  dataFattura = "";
  annoFattura = 0;
  showIdClienteFiltro: boolean = false;
  showStatoFatturaFiltro:boolean = false;
  showDataFatturaFiltro: boolean = false;
  showAnnoFatturaFiltro: boolean = false;
  toggleIdClienteForm() {
    this.showIdClienteFiltro = !this.showIdClienteFiltro;
  }
  toggleStatoFatturaForm() {
    this.showStatoFatturaFiltro = !this.showStatoFatturaFiltro;
  }
  toggleDataFatturaForm() {
    this.showDataFatturaFiltro = !this.showDataFatturaFiltro;
  }
  toggleAnnoFatturaForm() {
    this.showAnnoFatturaFiltro = !this.showAnnoFatturaFiltro;
  }


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

  // creaNuovaFattura() {
  //   this.FatturaService.creaFattura(this.nuovaFattura).subscribe(
  //     (fatturaCreata: Fattura) => {
  //       console.log('Fattura creata:', fatturaCreata);
  //       // Resetta i campi della nuova fattura
  //       this.nuovaFattura = {
  //         "id":"",
  //         "anno":null!,
  //         "data":"",
  //         "importo":null!,
  //         "statoFattura": "",
  //         "idCliente": "",
  //         "numeroFattura":"",
  //         "cliente": undefined
  //     };
  //       // Ricarica la lista delle fatture dopo la creazione
  //       this.loadFatture();
  //     },
  //     (error) => {
  //       console.error('Errore durante la creazione della fattura:', error);
  //     }
  //   );
  // }
  creaNuovaFattura() {
    const clienteId = this.nuovaFattura.idCliente;

    this.FatturaService.creaFattura(this.nuovaFattura, clienteId).subscribe(
      (fatturaCreata: Fattura) => {
        console.log('Fattura creata:', fatturaCreata);
        // Resetta i campi della nuova fattura
        this.nuovaFattura = {
          "id": "",
          "anno": null!,
          "data": "",
          "importo": null!,
          "statoFattura": "",
          "idCliente": "",
          "numeroFattura": "",
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

  getFiltroRagioneSociale():void {
    const rg=this.idCliente;
    this.FatturaService.getClientiRagioneSociale(this.page, this.pageSize, this.idCliente).subscribe((clienti: Clienti[])=>{
      console.log(clienti)},
      (error)=>{
        console.error("Error fetching clienti", error)
      }
    )
    }

    getFiltroStatoFattura():void {
      const st = this.statoFattura;
    this.FatturaService.getFatturaByStatoFattura(this.page, this.pageSize, st).subscribe((response) =>{
      console.log("filtro", response)},
      (error)=>{
        console.error(error)
      }
    )
    }

    getFiltroDataFattura():void {
      const df = this.dataFattura;
    this.FatturaService.getFatturaByData(this.page, this.pageSize, df).subscribe((response) =>{
      console.log("filtro", response)},
      (error)=>{
        console.error(error)
      }
    )
    }

    getFiltroAnnoFattura():void {
      const af = this.annoFattura;
    this.FatturaService.getFatturaByAnno(this.page, this.pageSize, af).subscribe((response) =>{
      console.log("filtro", response)},
      (error)=>{
        console.error(error)
      }
    )
    }

  onDeleteFatture(id: string): void {
    this.FatturaService.deleteFattura(id).subscribe(
      () => {
        console.log('Fattura eliminata con successo.');
        this.fatture = this.fatture.filter(fattura => fattura.id !== id);
      },
      (error) => {
        console.error("Errore durante eliminazione Fattura" , error);

      }
    );
  }


}
