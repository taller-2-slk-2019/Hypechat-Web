import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bot } from '../../models/Bot';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-organization-bots',
  templateUrl: './organization-bots.component.html',
  styleUrls: ['./organization-bots.component.css']
})
export class OrganizationBotsComponent extends BaseComponent implements OnInit {
  organizationId: string;
  title = 'Bots';
  bots: Array<Bot> = [];

  constructor(private route: ActivatedRoute, private botService: BotService,
              private localStorageService: MyLocalStorageService,
              private router: Router, private spinnerService: NgxSpinnerService) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');

    this.showLoading();
    this.botService.getBots(this.organizationId)
      .subscribe(data => {
        this.bots = data;
        this.hideLoading();
      }, error => {
        this.setError(this.connectionError);
        this.hideLoading();
      });
  }

}
