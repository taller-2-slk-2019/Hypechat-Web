import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../../services/channel.service';

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
    let valid = this.name === '';
    valid = valid || this.description === '';
    valid = valid || this.welcome === '';
    return valid;
  }

  createChannel() {
    const channel = {
      name: this.name,
      description: this.description,
      isPublic: this.type === 'Public',
      welcome: this.welcome,
      organizationId: +this.organizationId
    };
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
