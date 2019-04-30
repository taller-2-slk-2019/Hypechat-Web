import {MessageTypeCount} from './statistics/MessageTypeCount';
import {UserRoleCount} from './statistics/UserRoleCount';

export class OrganizationStatistics {
  usersCount: Array<UserRoleCount>;
  messagesCount: Array<MessageTypeCount>;
}
