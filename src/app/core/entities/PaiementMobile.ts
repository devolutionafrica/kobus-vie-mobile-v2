export class PaiementMobile{

  constructor(
    private _codeStatutTransaction: string,
    private _montant: string,
    private _numero: string,
    private _operateur: string,
    private _refId:string,
    private _refTransaction: string
  ){}

  public toJson():IPaiementMobile {
    return {
      codeStatutTransaction: this._codeStatutTransaction,
      montant: this._montant,
      numero: this._numero,
      operateur: this._operateur,
      refId:this._refId,
      refTransaction: this._refTransaction
    }
  }
}


export interface IPaiementMobile {
  codeStatutTransaction: string,
  montant: string,
  numero: string,
  operateur: string,
  refId:string,
  refTransaction: string
}
