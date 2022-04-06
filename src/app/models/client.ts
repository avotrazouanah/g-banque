export class Client {
  public numCompte: string;
  public nomClient: string;
  public solde: number;

  constructor(numCompte: string = '', nomClient: string = '', solde: number = 0) {
    this.numCompte = numCompte;
    this.nomClient = nomClient;
    this.solde = solde;
  }
}

export class ClientSelected {
  public clients: Client[];
  public status: boolean;

  constructor(clients?: Client[], status?: boolean) {
    this.clients = clients || [];
    this.status = status || false;
  }
}
