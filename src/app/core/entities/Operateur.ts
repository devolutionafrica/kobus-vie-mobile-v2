export class OperateurMobile {

  constructor(
    private _codeOperateur: string,
    private _codePays: string,
    private _indicatifPays: string,
    private _needOTP: boolean,
    private _pays: string,
    private _operateur: string
  ){}

  toJson():IOperateurMobile {
    return {
      codeOperateur: this._codeOperateur,
      codePays: this._codePays,
      indicatifPays: this._indicatifPays,
      needOTP: this._needOTP,
      pays: this._pays,
      operateur: this._operateur
    }
  }
}


export interface IOperateurMobile {
  codeOperateur: string,
  codePays: string,
  indicatifPays: string,
  needOTP: boolean,
  pays: string,
  operateur: string
}
