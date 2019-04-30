import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BaseComponent} from '../../components/base/base.component';
import {OrganizationService} from '../../services/organization.service';
import {OrganizationStatistics} from '../../models/OrganizationStatistics';
import {UserRoleHelper} from '../../helpers/UserRoleHelper';
import {MessageTypeHelper} from '../../helpers/MessageTypeHelper';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent extends BaseComponent implements OnInit {
  title = 'Estadísticas';
  organizationId: string;
  stats: OrganizationStatistics;
  userRoles: string[];
  messageTypes: string[];


  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) {
    super();
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.organizationService.getStatistics(this.organizationId)
      .subscribe(data => {
          this.stats = data;
          this.userRoles = this.getUserRoles();
          this.messageTypes = this.getMessageTypes();
        },
        error =>  this.setError(this.connectionError)
      );
  }

  getUserRoles() {
    return this.stats.usersCount.map(role => UserRoleHelper.translate(role.role));
  }

  getMessageTypes() {
    return this.stats.messagesCount.map(type => MessageTypeHelper.translate(type.type));
  }
}
