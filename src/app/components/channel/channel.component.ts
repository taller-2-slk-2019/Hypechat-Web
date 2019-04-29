import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Channel } from '../../models/Channel';
import * as moment from 'moment';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;
  @Input() organizationId: string;
  @Output() delete = new EventEmitter<Channel>();

  constructor() { }

  ngOnInit() {
  }

  channelCreationDate() {
    return moment(this.channel.createdAt);
  }

  deleteChannel() {
    this.delete.emit(this.channel);
  }
}
