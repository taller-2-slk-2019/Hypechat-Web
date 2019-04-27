import { Component, OnInit } from '@angular/core';
import { Channel } from '../../models/Channel';
import { ChannelService } from '../../services/channel.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
  title = 'Canales';
  organizationId: string;
  channels: Array<Channel> = [];
  errorMessage = '';

  constructor(private route: ActivatedRoute, private channelService: ChannelService) { }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');

    this.channelService.getChannels(this.organizationId)
      .subscribe(data => this.channels = data,
        error =>  this.errorMessage = 'Error de conexión'
      );
  }

}
