import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bot } from '../../models/Bot';
import { BotService } from '../../services/bot.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organization-bots',
  templateUrl: './organization-bots.component.html',
  styleUrls: ['./organization-bots.component.css']
})
export class OrganizationBotsComponent extends BaseComponent implements OnInit {
  organizationId: string;
  title = 'Bots';
  bots: Array<Bot> = [];
  botName = '';
  botUrl = '';

  constructor(private route: ActivatedRoute, private botService: BotService,
              localStorageService: MyLocalStorageService,
              router: Router, spinnerService: NgxSpinnerService,
              toastService: ToastrService) {
    super(localStorageService, router, spinnerService, toastService);
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

  addBot() {
    if (this.bots.every(bot => bot.name !== this.botName)) {
      this.showLoading();
      this.botService.addBot(this.botName, this.botUrl, this.organizationId)
        .subscribe(data => {
          this.bots.push(data);
          this.setSuccess('El bot se cargó correctamente');
          this.hideLoading();
        }, error => {
          this.setError('No se pudo agregar el bot');
          this.hideLoading();
        });
    } else {
      this.setWarning('Ya existe un bot con ese nombre en la organización');
    }
    this.botName = '';
    this.botUrl = '';
  }

  deleteBot(deleteBot: Bot) {
    this.showLoading();
    this.botService.deleteBot(deleteBot.id)
      .subscribe(data => {
        this.bots = this.bots.filter(bot => bot.id !== deleteBot.id);
        this.setSuccess('El bot se eliminó correctamente');
        this.hideLoading();
      }, error => {
        this.setError('No se pudo eliminar al bot');
        this.hideLoading();
      });
  }

  isInvalidName() {
    return this.botName.includes(' ');
  }

  isInvalidUrl() {
    return this.botUrl.includes(' ');
  }
}
