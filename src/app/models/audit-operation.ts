import { Client } from './client';
import { ParseDateSQLtoString } from '../utils/date-parse';
import { User } from './user';

export class AuditOperation {
  public ops: string;
  public date: string;
  public dateStr: string;
  public numCheck: string;
  public montant: number;
  public client: Client;
  public user: User;

  constructor(
    ops: string = '',
    date: string = '',
    numCheck: string = '',
    montant: number = 0,
    client: Client = new Client(),
    user: User = new User()
  ) {
    this.ops = ops;
    this.date = date;
    this.dateStr = ParseDateSQLtoString(this.date);
    this.numCheck = numCheck;
    this.montant = montant;
    this.client = client;
    this.user = user;
  }
}
