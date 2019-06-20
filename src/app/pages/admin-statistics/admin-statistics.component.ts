import { Component, OnInit } from '@angular/core';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { AdminService } from '../../services/admin.service';
import { RequestStats } from '../../models/RequestStats';
import { BaseComponent } from '../../components/base/base.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent extends BaseComponent implements OnInit {
  title = 'Estadísticas Generales';
  stats: Array<RequestStats> = [];
  adminCalls = '0.0';

  constructor(private adminService: AdminService, spinnerService: NgxSpinnerService,
              localStorageService: MyLocalStorageService, router: Router, toastService: ToastrService) {
    super(localStorageService, router, spinnerService, toastService);
    localStorageService.clearOrganization();
    localStorageService.clearChannel();
  }

  ngOnInit() {
    this.showLoading();
    this.adminService.getGeneralStats().subscribe(data => {
      this.stats = data;
      this.calculateAdminCallsPercentage();
      this.hideLoading();
    }, error => {
      this.setError(this.connectionError);
      this.hideLoading();
    });
  }

  private calculateAdminCallsPercentage() {
    if (this.stats.length > 0) {
      const adminCalls = this.stats.filter(item => item.isAdmin).length;
      this.adminCalls = (adminCalls * 100 / this.stats.length).toFixed(2);
    }
  }
}
