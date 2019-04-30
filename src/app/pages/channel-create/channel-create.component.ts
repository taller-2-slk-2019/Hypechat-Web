import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../components/base/base.component';
import {Channel} from '../../models/Channel';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent extends BaseComponent implements OnInit {
  title = 'Crear Canal';
  organizationId: string;
  name = '';
  description = '';
  welcome = '';
  type = 'Public';
  aux: string;
  aux2: number;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
  }

  isInvalid() {
    let valid = this.name === '';
    valid = valid || this.description === '';
    valid = valid || this.welcome === '';
    return valid;
  }

  createChannel() {
    const data = {
      name: this.name,
      isPublic: this.type === 'Public',
      welcome: this.welcome,
      organizationId: +this.organizationId
    };
  }
}
