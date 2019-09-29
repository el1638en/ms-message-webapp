
export class Fonction {
    code: string;
    libelle: string;
    constructor(value: Partial<Fonction>) {
        Object.assign(this, value);
    }
}
