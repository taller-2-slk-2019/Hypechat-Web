import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import { Channel } from '../../models/Channel';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-channel-create-edit',
  templateUrl: './channel-create-edit.component.html',
  styleUrls: ['./channel-create-edit.component.css']
})
export class ChannelCreateEditComponent extends BaseComponent implements OnInit {
  title = 'Crear Canal';
  organizationId: string;
  channel =  new Channel();
  savedChannel: Channel;
  hasChanged = false;

  constructor(private route: ActivatedRoute, private channelService: ChannelService,
              localStorageService: MyLocalStorageService, router: Router,
              spinnerService: NgxSpinnerService, toastService: ToastrService) {
    super(localStorageService, router, spinnerService, toastService);
    this.savedChannel = localStorageService.getChannel();
    this.organizationId = this.route.snapshot.paramMap.get('id');
    const channelId = this.route.snapshot.paramMap.get('channelId');
    if (channelId && (!this.savedChannel || this.savedChannel.id.toString() !== channelId)) {
      router.navigate([`/organization/${this.organizationId}/channels`]);
    }
  }

  ngOnInit() {
    if (this.savedChannel) {
      this.channel = this.savedChannel;
      this.title = 'Editar Canal';
    } else {
      this.reset();
    }
    this.channel.organizationId = Number(this.organizationId);
  }

  onInputChange() {
    this.hasChanged = true;
  }

  isInvalid() {
    let invalid = this.channel.name === '';
    invalid = invalid || this.channel.description === '';
    invalid = invalid || this.channel.welcome === '';
    invalid = invalid || !this.hasChanged;
    return invalid;
  }

  createChannel() {
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
    this.showLoading();
    this.channelService.editChannel(this.channel).subscribe(
      data => {
        this.setSuccess(`El canal "${this.channel.name}" fue actualizado`);
        this.hasChanged = false;
        this.hideLoading();
      },
      error => {
        this.setError('No se pudo actualizar el canal');
        this.hideLoading();
      }
    );
  }

  saveChannel() {
    if (this.savedChannel) {
      this.editChannel();
    } else {
      this.createChannel();
    }
  }

  reset() {
    this.channel.name = '';
    this.channel.description = '';
    this.channel.welcome = '';
    this.channel.isPublic = true;
    this.hasChanged = false;
  }
}
