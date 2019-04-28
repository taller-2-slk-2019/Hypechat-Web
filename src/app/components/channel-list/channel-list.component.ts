import { Component, OnInit } from '@angular/core';
import { Channel } from '../../models/Channel';
import { ChannelService } from '../../services/channel.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent extends BaseComponent implements OnInit {
  title = 'Canales';
  organizationId: string;
  channels: Array<Channel> = [];

  constructor(private route: ActivatedRoute, private channelService: ChannelService) {
    super();
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');

    this.channelService.getChannels(this.organizationId)
      .subscribe(data => this.channels = data,
        error =>  this.setError(this.connectionError)
      );
  }

}
