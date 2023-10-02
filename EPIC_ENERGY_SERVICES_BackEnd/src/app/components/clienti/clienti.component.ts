import { Component, OnInit } from '@angular/core';
import { Clienti } from 'src/app/models/clienti.interface';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
  page = 0; // Imposta la pagina iniziale
  pageSize =10;
ragioneSociale = ""
dataInserimento ="dataInserimento"
dataUltimoContatto="dataUltimoContatto"
parteRagioneSociale =""
showFatturatoForm: boolean = false;
showDataInserimentoForm:boolean = false;
showDataUltimoContattoForm:boolean = false;
showParteRagioneSocialeForm:boolean = false;
toggleFatturatoForm() {
  this.showFatturatoForm = !this.showFatturatoForm;
}
toggleDataInserimentoForm() {
  this.showDataInserimentoForm = !this.showDataInserimentoForm

}
toggleDataUltimoContattoForm() {
  this.showDataUltimoContattoForm = !this.showDataUltimoContattoForm

}
toggleParteRagioneSocialeForm() {
  this.showParteRagioneSocialeForm = !this.showParteRagioneSocialeForm

}
fatturatoAnnuale= 0;

  showAggiungiForm: boolean = false;
  totalPages = 0;
  currentPage = 0;
  clienti: Clienti[] = [];
  nuovoCliente: Clienti = {
    "idCliente":"",
     "ragioneSociale": "",
  "partitaIva":"",
  "emailCliente":"",
  "pec":"",
  "telefonoCliente":null!,
  "tipoCliente":"",
  "nomeContatto":"",
  "cognomeContatto":"",
  "emailContatto":"",
  "telefonoContatto":"",
  "viaUno":"",
  "civicoUno":null!,
  "localitaUno":"",
  "capUno":"",
  "comuneUno":"",
  "viaDue":"",
  "civicoDue":null!,
  "localitaDue":"",
  "capDue":"",
  "comuneDue":"",
  "dataInserimento":"",
  "ultimoContatto":"",
  "fatturatoAnnuale":null!,
"fatture": undefined,
"indirizzoSedeLegale": undefined,
"civico":""
};

  constructor(private provinciaService: AppService) {}


    ngOnInit(): void {

      this.loadClienti();
      // this.getFiltroRagioneSociale();
    }



  // loadClienti() {
  //   this.provinciaService.getClienti(0, 'ragioneSociale').subscribe(
  //     (clienti: Clienti[]) => {
  //       console.log(clienti);
  //       this.clienti = clienti;
  //     },
  //     (error) => {
  //       console.error('Error fetching clienti:', error);
  //     }
  //   );
  // }
  // loadClienti2222222(): void {
  //   const pageSize =10;
  //   this.provinciaService.getClienti(page, pageSize).subscribe(
  //     (response) => {
  //       console.log( "filtro",response)
  //     },
  //     (error) => {
  //       console.error("Error fetching clienti:", error);
  //     }
  //   );
  // }
  loadClienti(): void {

    this.provinciaService.getClienti(this.page, 'ragioneSociale').subscribe(
      (clienti: Clienti[]) => {
        console.log(clienti);
        this.clienti = clienti;
      },
      (error) => {
        console.error("Error fetching clienti:", error);
      }
    );
  }



    nextPage() {
      this.page++; // Vai alla pagina successiva
      this.loadClienti();

    }

    previousPage() {
      if (this.page > 0) {
        this.page--; // Vai alla pagina precedente solo se non sei sulla prima pagina
        this.loadClienti();
      }
    }


  creaNuovoCliente() {
    this.provinciaService.creaCliente(this.nuovoCliente).subscribe(
      (clienteCreato: Clienti) => {
        console.log('Cliente creato:', clienteCreato);
        // Resetta i campi del nuovo cliente
        this.nuovoCliente = {
          "idCliente":"",
           "ragioneSociale": "",
        "partitaIva":"",
        "emailCliente":"",
        "pec":"",
        "telefonoCliente":null!,
        "tipoCliente":"",
        "nomeContatto":"",
        "cognomeContatto":"",
        "emailContatto":"",
        "telefonoContatto":"",
        "viaUno":"",
        "civicoUno":null!,
        "localitaUno":"",
        "capUno":"",
        "comuneUno":"",
        "viaDue":"",
        "civicoDue":null!,
        "localitaDue":"",
        "capDue":"",
        "comuneDue":"",
        "dataInserimento":"",
        "ultimoContatto":"",
        "fatturatoAnnuale":null!,
        "fatture": undefined,
      "indirizzoSedeLegale": undefined,
      "civico":""
      };
        // Ricarica la lista dei clienti dopo la creazione
        // this.loadClienti();
      },
      (error) => {
        console.error('Errore durante la creazione del cliente:', error);
      }
    );
  }



  // getFiltroRagioneSociale():void {

  //   const rg="ciao";
  //   const page = 0;
  //   const pageSize =10;
  //   this.provinciaService.getClientiRagioneSociale(page,pageSize,rg).subscribe((response)=>{
  //     console.log( "filtro",response)},
  //     (error)=>{
  //       console.error(error)
  //     }
  //   )
  //   }

    onDeleteCliente(id: string): void {
      this.provinciaService.deleteCliente(id).subscribe(
        () => {
          console.log('Cliente eliminato con successo.');
          this.clienti = this.clienti.filter(cliente => cliente.idCliente !== id);
        },
        (error) => {
          console.error("Errore durante eliminazione cliente" , error);

        }
      );
    }


    applyFatturatoFilter(): void {
      this.provinciaService.getClientiByFatturatoAnnuale(this.fatturatoAnnuale, this.page, this.pageSize).subscribe(
        (clienti: Clienti[]) => {
          console.log(clienti);
          this.clienti = clienti;
        },
        (error) => {
          console.error("Error fetching clienti:", error);
        }
      );
    }


    applyDataInserimentoFilter(): void {
      this.provinciaService.getClientiByDataInserimento(this.dataInserimento, this.page, this.pageSize).subscribe(
        (clienti: Clienti[]) => {
          console.log(clienti);
          this.clienti = clienti;
        },
        (error) => {
          console.error("Error fetching clienti:", error);
        }
      );
    }


    applyDataUltimoContattoFilter(): void {
      this.provinciaService.getClientiByDataUltimoContatto(this.dataUltimoContatto, this.page, this.pageSize).subscribe(
        (clienti: Clienti[]) => {
          console.log(clienti);
          this.clienti = clienti;
        },
        (error) => {
          console.error("Error fetching clienti:", error);
        }
      );
    }
    applyParteRagioneSocialeFilter(): void {
      this.provinciaService.getClientiByParteRagioneSociale(this.parteRagioneSociale, this.page, this.pageSize).subscribe(
        (clienti: Clienti[]) => {
          console.log(clienti);
          this.clienti = clienti;
        },
        (error) => {
          console.error("Error fetching clienti:", error);
        }
      );
    }

}









