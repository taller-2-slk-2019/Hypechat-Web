import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import {Channel} from '../../models/Channel';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent extends BaseComponent implements OnInit {
  title = 'Crear Canal';
  organizationId: string;
  name: string;
  description: string;
  welcome: string;
  type: string;

  constructor(private route: ActivatedRoute, private channelService: ChannelService) {
    super();
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.reset();
  }

  isInvalid() {
    let invalid = this.name === '';
    invalid = invalid || this.description === '';
    invalid = invalid || this.welcome === '';
    return invalid;
  }

  createChannel() {
    const channel = new Channel();
    channel.name = this.name;
    channel.description = this.description;
    channel.isPublic = this.type === 'Public';
    channel.welcome = this.welcome;
    channel.organizationId = +this.organizationId;

    this.channelService.createChannel(channel).subscribe(
      data => {
        this.setSuccess(`El canal "${data.name}" fue creado`);
        this.reset();
      },
      error => this.setError('No se pudo crear el canal')
    );
  }

  reset() {
    this.name = '';
    this.description = '';
    this.welcome = '';
    this.type = 'Public';
  }
}
