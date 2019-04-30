import {Component, Input, OnInit} from '@angular/core';
import {UserRoleCount} from '../../models/statistics/UserRoleCount';
import {Label} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() labels: Label[];
  @Input() data: Array<UserRoleCount>;

  chartData: number[];
  chartType: ChartType = 'pie';
  chartLegend = true;

  constructor() { }

  ngOnInit() {
    this.chartData = this.data.map(role => role.count);
  }

  getTotal() {
    return this.data.reduce((total, data) => total + Number(data.count), 0);
  }
}
