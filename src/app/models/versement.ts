import { Client } from './client';
import { ParseDateSQLtoString } from '../utils/date-parse';

export class Versement {
  public numVersement: string;
  public numCheck: string;
  public montant: number;
  public date: string;
  public dateStr: string;
  public client: Client;

  constructor(
    numVersement: string = '',
    numCheck: string = '',
    montant: number = 0,
    date: string = '',
    client: Client = new Client()
  ) {
    this.numVersement = numVersement;
    this.numCheck = numCheck;
    this.montant = montant;
    this.date = date;
    this.dateStr = ParseDateSQLtoString(date);
    this.client = client;
  }
}

export class VersementSelected {
  public versements: Versement[];
  public status: boolean;

  constructor(versements?: Versement[], status?: boolean) {
    this.versements = versements || [];
    this.status = status || false;
  }
}
