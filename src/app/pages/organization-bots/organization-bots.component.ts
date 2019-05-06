import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-organization-bots',
  templateUrl: './organization-bots.component.html',
  styleUrls: ['./organization-bots.component.css']
})
export class OrganizationBotsComponent extends BaseComponent implements OnInit {
  organizationId: string;
  title = 'Bots';

  constructor(private route: ActivatedRoute, private localStorageService: MyLocalStorageService,
              private router: Router, private spinnerService: NgxSpinnerService) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
  }

}
