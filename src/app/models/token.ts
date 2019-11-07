import { Fonction } from './fonction';

export class Token {
  value: string;
  dateExpiration: Date;
  userName: string;
  userFirstName: string;
  roleCode: string;
  roleLibelle: string;
  fonctions: Fonction[];

  constructor(value: Partial<Token>) {
    Object.assign(this, value);
  }

}
