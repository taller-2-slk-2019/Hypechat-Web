import { Component, OnInit } from '@angular/core';
import { Channel } from '../../models/Channel';
import { ChannelService } from '../../services/channel.service';
import {ActivatedRoute, Router} from '@angular/router';
import { BaseComponent } from '../../components/base/base.component';
import { DialogService } from '../../services/dialog.service';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent extends BaseComponent implements OnInit {
  title = 'Canales';
  organizationId: string;
  channels: Array<Channel> = [];

  constructor(private route: ActivatedRoute, private channelService: ChannelService,
              private dialogService: DialogService, private router: Router,
              private localStorageService: MyLocalStorageService, private spinnerService: NgxSpinnerService) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.showLoading();

    this.channelService.getChannels(this.organizationId)
      .subscribe(data => {
          this.channels = data;
          this.hideLoading();
        },
        error =>  {
          this.setError(this.connectionError);
          this.hideLoading();
        }
      );
  }

  deleteChannel(channel: Channel) {
    this.dialogService.openConfirmDialog('¿Seguro que desea borrar el canal?')
      .afterClosed().subscribe(response => {
        if (response) {
          this.showLoading();
          this.channelService.deleteChannel(channel.id.toString())
            .subscribe(data => {
                this.hideLoading();
                this.setSuccess(`El canal "${channel.name}" fue eliminado`);
                this.channels = this.channels.filter(chl => chl.id !== channel.id);
              },
              error => {
                this.setError('No se pudo eliminar el canal');
                this.hideLoading();
              });
        }
    });
  }
}
