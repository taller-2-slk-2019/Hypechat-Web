export class UserRoleHelper {

  private static roles = ['creator', 'moderator', 'member'];

  private static translations =
    {
      creator: 'Creador',
      moderator: 'Moderador',
      member: 'Miembro'
    };

  public static getRoles() {
    return UserRoleHelper.roles;
  }

  public static translate(role: string) {
    return UserRoleHelper.translations[role];
  }

}
