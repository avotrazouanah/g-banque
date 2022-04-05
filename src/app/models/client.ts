export class Client {
  public numCompte: number;
  public nomClient: string;
  public solde: number;

  constructor(numCompte: number = 0, nomClient: string = '', solde: number = 0) {
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
