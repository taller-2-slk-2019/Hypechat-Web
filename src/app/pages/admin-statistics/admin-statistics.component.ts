import { Component, OnInit } from '@angular/core';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { AdminService } from '../../services/admin.service';
import { RequestStats } from '../../models/RequestStats';
import { BaseComponent } from '../../components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BarChartDataset } from '../../models/statistics/BarChartDataset';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent extends BaseComponent implements OnInit {
  title = 'Estadísticas Generales';
  stats: Array<RequestStats> = [];
  adminCalls = 0;
  methods: Array<BarChartDataset> = [];
  codes: Array<BarChartDataset> = [];
  responseTime = { min: +Infinity, max: 0, average: 0 };

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
      this.getMethodTypes();
      this.getStatusCodes();
      this.calculateResponseTime();
      this.hideLoading();
    }, error => {
      this.setError(this.connectionError);
      this.hideLoading();
    });
  }

  private calculateAdminCallsPercentage() {
    if (this.stats.length > 0) {
      this.adminCalls = this.stats.filter(item => item.isAdmin).length;
      this.adminCalls = this.adminCalls * 100 / this.stats.length;
    }
  }

  private getMethodTypes() {
    const dictionary = new Map();
    this.stats.forEach( item => {
      if (!dictionary.has(item.method)) {
        dictionary.set(item.method, new BarChartDataset());
        dictionary.get(item.method).label = item.method;
        dictionary.get(item.method).data = [0];
      }
      dictionary.get(item.method).data[0] += 1;
    });
    this.methods = Array.from(dictionary.values());
  }

  private getStatusCodes() {
    const dictionary = new Map();
    this.stats.forEach( item => {
      if (!dictionary.has(item.statusCode)) {
        dictionary.set(item.statusCode, new BarChartDataset());
        dictionary.get(item.statusCode).label = item.statusCode;
        dictionary.get(item.statusCode).data = [0];
      }
      dictionary.get(item.statusCode).data[0] += 1;
    });
    this.codes = Array.from(dictionary.values());
  }

  private calculateResponseTime() {
    if (this.stats.length > 0) {
      this.stats.forEach(item => {
        if (item.responseTime < this.responseTime.min) {
          this.responseTime.min = item.responseTime;
        }
        if (item.responseTime > this.responseTime.max) {
          this.responseTime.max = item.responseTime;
        }
        this.responseTime.average += item.responseTime;
      });
      this.responseTime.average /= this.stats.length;
    }
  }
}
