export class CGU {
  constructor(
    private _libelle: string,
    private _object: string,
    private _contenu: string
  ){}

  toJson(): JsonCGU {
    return {
      libelle: this._libelle,
      object: this._object,
      contenu: this._contenu
    };
  }
}

export interface JsonCGU {
  libelle: string;
  object: string;
  contenu: string;
}
