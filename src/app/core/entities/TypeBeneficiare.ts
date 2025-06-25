export class TypeBeneficiare {
  constructor(
    private _id: string,
    private _libelle: string,
    private _occurances: number
  ){}

  toJson():ITypeBeneficiare {
    return {
      id: this._id,
      libelle: this._libelle,
      occurances: this._occurances
    }
  }
}

export interface ITypeBeneficiare {
  id: string,
  libelle: string,
  occurances: number
}
