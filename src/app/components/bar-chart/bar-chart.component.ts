import { Component, Input, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { BarChartDataset } from '../../models/statistics/BarChartDataset';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() labels: Label[];
  @Input() data: Array<BarChartDataset>;

  chartData: Array<BarChartDataset> = [];
  chartType: ChartType = 'bar';
  chartLegend = true;

  constructor() { }

  ngOnInit() {
    this.chartData = this.data.sort((dataset1, dataset2) => {
      if (dataset1.label > dataset2.label) {
        return 1;
      } else if (dataset1.label < dataset2.label) {
        return -1;
      }
      return 0;
    });
  }

  getTotal() {
    return this.data.reduce((total, data) => total + Number(data.data[0]), 0);
  }
}
