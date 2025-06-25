export class Beneficiaire {
  constructor(
    private _typeBeneficiaireId:string,
    private _repartition:number,
    private _nom?:string,
    private _prenom?:string,
    private _dateNaissance?:string,
    private _lieuDeNaissance?:string,
    private _telephone?:string,
  ){}

  toJson():IBeneficiaire{
    return {
      TypeBeneficiaire:this._typeBeneficiaireId,
      Repartition:this._repartition,
      Nom:this._nom,
      Prenoms:this._prenom,
      DateNaissance:this._dateNaissance,
      LieuDeNaissance:this._lieuDeNaissance,
      Telephone:this._telephone,
    }
  }
}

export interface IBeneficiaire {
  TypeBeneficiaire:string,
  Repartition:number,
  Nom?:string,
  Prenoms?:string,
  DateNaissance?:string,
  LieuDeNaissance?:string,
  Telephone?:string
}
