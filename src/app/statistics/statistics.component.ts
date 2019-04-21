import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  organizationId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
  }

}
