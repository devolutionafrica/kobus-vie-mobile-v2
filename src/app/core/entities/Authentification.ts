export class Authentification {

  constructor(
    private _codeFiliale?: string,
    private _clientNumber?: number,
    private _fullname?: string,
    private _role?: string,
    private _isFirstConnexion?: boolean
  ){}

  get filiale(){
    return this._codeFiliale;
  }

  set isFirstConnexion(statusCnx: number){
    this._isFirstConnexion = statusCnx === 0 ? true : false;
  }

  get nuClient(){
    return this._clientNumber;
  }

  toJson(): IAuthentification {
    return {
      codeFiliale: this._codeFiliale,
      clientNumber: this._clientNumber,
      fullname: this._fullname,
      role: this._role,
      isFirstConnexion: this._isFirstConnexion
    };
  }

}

export interface IAuthentification {
  codeFiliale?: string;
  clientNumber?: number;
  fullname?: string;
  role?: string;
  isFirstConnexion?: boolean;
}
