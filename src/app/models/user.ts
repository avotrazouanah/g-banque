export class User {
  public id: number;
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public email: string;
  public password: string;
  public address: string;
  public country: string;
  public role: string;
  public numberPhone: string;
  public town: string;
  public postal_code: string;

  constructor(
    id?: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string,
    address?: string,
    country?: string,
    role?: string,
    numberPhone?: string,
    town?: string,
    postal_code?: string
  ) {
    this.id = id || 0;
    this.first_name = first_name || '';
    this.last_name = last_name || '';
    this.full_name = first_name + ' ' + last_name;
    this.email = email || '';
    this.password = password || '';
    this.address = address || '';
    this.country = country || '';
    this.role = role || '';
    this.numberPhone = numberPhone || '';
    this.town = town || '';
    this.postal_code = postal_code || '';
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
