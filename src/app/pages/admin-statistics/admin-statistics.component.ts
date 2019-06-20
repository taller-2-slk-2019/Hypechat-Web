import { Component, OnInit } from '@angular/core';
import { MyLocalStorageService } from '../../services/my-local-storage.service';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {
  title = 'Estadísticas Generales';

  constructor(localStorageService: MyLocalStorageService) {
    localStorageService.clearOrganization();
    localStorageService.clearChannel();
  }

  ngOnInit() {
  }

}
