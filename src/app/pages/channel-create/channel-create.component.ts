import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import {Channel} from '../../models/Channel';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent extends BaseComponent implements OnInit {
  title = 'Crear Canal';
  organizationId: string;
  type: string;
  channel =  new Channel();

  constructor(private route: ActivatedRoute, private channelService: ChannelService,
              router: Router, localStorageService: MyLocalStorageService,
              spinnerService: NgxSpinnerService) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.reset();
  }

  isInvalid() {
    let invalid = this.channel.name === '';
    invalid = invalid || this.channel.description === '';
    invalid = invalid || this.channel.welcome === '';
    return invalid;
  }

  createChannel() {
    this.channel.isPublic = this.type === 'Public';
    this.channel.organizationId = +this.organizationId;

    this.showLoading();
    this.channelService.createChannel(this.channel).subscribe(
      data => {
        this.setSuccess(`El canal "${data.name}" fue creado`);
        this.reset();
        this.hideLoading();
      },
      error => {
        this.setError('No se pudo crear el canal');
        this.hideLoading();
      }
    );
  }

  reset() {
    this.type = 'Public';
    this.channel.name = '';
    this.channel.description = '';
    this.channel.welcome = '';
    this.channel.isPublic = true;
  }
}
