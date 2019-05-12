import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import {Channel} from '../../models/Channel';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create-edit.component.html',
  styleUrls: ['./channel-create-edit.component.css']
})
export class ChannelCreateEditComponent extends BaseComponent implements OnInit {
  title = 'Crear Canal';
  organizationId: string;
  type: string;
  channel =  new Channel();
  savedChannel: Channel;

  constructor(private route: ActivatedRoute, private channelService: ChannelService,
              localStorageService: MyLocalStorageService, router: Router,
              spinnerService: NgxSpinnerService) {
    super(localStorageService, router, spinnerService);
    this.savedChannel = localStorageService.getChannel();
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    if (this.savedChannel) {
      this.copyChannel();
      this.type = this.translateType();
    } else {
      this.reset();
    }
    this.channel.organizationId = +this.organizationId;
  }

  isInvalid() {
    let invalid = this.channel.name === '';
    invalid = invalid || this.channel.description === '';
    invalid = invalid || this.channel.welcome === '';
    return invalid;
  }

  createChannel() {
    this.channel.isPublic = this.type === 'Public';

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

  editChannel() {
    this.channel.isPublic = this.type === 'Public';
    this.showLoading();
    this.channelService.editChannel(this.channel).subscribe(
      data => {
        this.setSuccess(`El canal "${this.channel.name}" fue actualizado`);
        this.hideLoading();
      },
      error => {
        this.setError('No se pudo actualizar el canal');
        this.hideLoading();
      }
    );
  }

  executeFunction() {
    if (this.savedChannel) {
      this.editChannel();
    } else {
      this.createChannel();
    }
  }

  reset() {
    this.type = 'Public';
    this.channel.name = '';
    this.channel.description = '';
    this.channel.welcome = '';
    this.channel.isPublic = true;
  }

  private copyChannel() {
    this.channel.name = this.savedChannel.name;
    this.channel.description = this.savedChannel.description;
    this.channel.welcome = this.savedChannel.welcome;
    this.channel.isPublic = this.savedChannel.isPublic;
    this.channel.id = this.savedChannel.id;
  }

  private translateType() {
    if (this.channel.isPublic) {
      return 'Public';
    }
    return 'Private';
  }
}
