import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Channel } from '../../models/Channel';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MyLocalStorageService } from '../../services/my-local-storage.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;
  @Input() organizationId: string;
  @Output() delete = new EventEmitter<Channel>();

  constructor(private router: Router, private localStorageService: MyLocalStorageService) { }

  ngOnInit() {
  }

  channelCreationDate() {
    return moment(this.channel.createdAt);
  }

  deleteChannel() {
    this.delete.emit(this.channel);
  }

  editChannel() {
    this.localStorageService.setChannel(this.channel);
    this.router.navigate([`/organization/${this.organizationId}/channels/edit`]);
  }
}
