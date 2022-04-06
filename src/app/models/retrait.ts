import { Client } from './client';
import { ParseDateSQLtoString } from '../utils/date-parse';

export class Retrait {
  public numRetrait: string;
  public numCheck: string;
  public montant: number;
  public date: string;
  public dateStr: string;
  public client: Client;

  constructor(
    numRetrait: string = '',
    numCheck: string = '',
    montant: number = 0,
    date: string = '',
    client: Client = new Client()
  ) {
    this.numRetrait = numRetrait;
    this.numCheck = numCheck;
    this.montant = montant;
    this.date = date;
    this.dateStr = ParseDateSQLtoString(date);
    this.client = client;
  }
}

export class RetraitSelected {
  public retraits: Retrait[];
  public status: boolean;

  constructor(retraits?: Retrait[], status?: boolean) {
    this.retraits = retraits || [];
    this.status = status || false;
  }
}
