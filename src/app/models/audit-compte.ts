import { Client } from './client';
import { ParseDateSQLtoString } from '../utils/date-parse';
import { User } from './user';

export class AuditCompte {
  public ops: string;
  public date: string;
  public dateStr: string;
  public anc_montant: number;
  public n_montant: number;
  public client: Client;
  public user: User;

  constructor(
    ops: string = '',
    date: string = '',
    anc_montant: number = 0,
    n_montant: number = 0,
    client: Client = new Client(),
    user: User = new User()
  ) {
    this.ops = ops;
    this.date = date;
    this.dateStr = ParseDateSQLtoString(this.date);
    this.anc_montant = anc_montant;
    this.n_montant = n_montant;
    this.client = client;
    this.user = user;
  }
}
