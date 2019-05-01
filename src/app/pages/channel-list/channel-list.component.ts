import { Component, OnInit } from '@angular/core';
import { Channel } from '../../models/Channel';
import { ChannelService } from '../../services/channel.service';
import {ActivatedRoute, Router} from '@angular/router';
import { BaseComponent } from '../../components/base/base.component';
import { DialogService } from '../../services/dialog.service';
import {LocalStorageService} from 'angular-2-local-storage';

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
              private localStorageService: LocalStorageService) {
    super(localStorageService, router);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');

    this.channelService.getChannels(this.organizationId)
      .subscribe(data => this.channels = data,
        error =>  this.setError(this.connectionError)
      );
  }

  deleteChannel(channel: Channel) {
    this.dialogService.openConfirmDialog('¿Seguro que desea borrar el canal?')
      .afterClosed().subscribe(response => {
        if (response) {
          this.channelService.deleteChannel(channel.id.toString())
            .subscribe(data => {
                this.setSuccess(`El canal "${channel.name}" fue eliminado`);
                this.channels = this.channels.filter(chl => chl.id !== channel.id);
              },
              error => this.setError('No se pudo eliminar el canal'));
        }
    });
  }
}
