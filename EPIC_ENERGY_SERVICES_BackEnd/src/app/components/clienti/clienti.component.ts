import { Component, OnInit } from '@angular/core';
import { Clienti } from 'src/app/models/clienti.interface';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
  province: Clienti[] = [];

  constructor(private provinciaService: AppService) {}

  ngOnInit(): void {
    this.loadProvince();
  }

  loadProvince() {
    this.provinciaService.getProvince(0, 'provincia').subscribe(
      (province: Clienti[]) => {
        this.province = province;
      },
      (error) => {
        console.error('Error fetching province:', error);
      }
    );
  }
}








