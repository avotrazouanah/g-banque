export class User {
  public username: string;
  public name: string;
  public password: string;
  public type: string;
  public user_id: string;

  constructor(
    username: string = '',
    name: string = '',
    password: string = '',
    type: string = '',
    user_id: string = ''
  ) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.type = type;
    this.user_id = user_id;
  }
}

export class UserSelected {
  public users: User[];
  public status: boolean;

  constructor(users?: User[], status?: boolean) {
    this.users = users || [];
    this.status = status || false;
  }
}
