export class GarantieSouscrite{

  constructor(
      private _libelle: string,
      private _montant: number,
      private _typeGarantie: string
    ){}

  toJson():IGarantieSouscrite{
      return {
        libelle: this._libelle ,
        montant: this._montant,
        typeGarantie: this._typeGarantie
      }
    }
}

export interface IGarantieSouscrite {
  libelle: string,
  montant: number,
  typeGarantie: string
}


export interface IGarantieSouscriteFacultativeFactory {
  code: string
  libelle: string
  prime: number
  abreviation: string
  identifiant: number
  montant: number
}
