import { FilialeIcon } from "src/app/config/filialeFlag";

export class Filiale {

  constructor(
    private _apiUrl: string,
    private _devise: string,
    private _libelle: string,
    private _idFiliale: number,
    private codeFiliale: string,
    private _documentUrl: string,
    private codeFilialePaiement: string,
    private _urlVideoPublicitaire: string,
    private _urlSouscription?: string,
    private _urlIxpertaPay?: string,
    private _ixpertaPayKey?: string
  ){}

  toJson(): IFilialeJsonFormat {
    return {
      apiUrl: this._apiUrl,
      devise: this._devise,
      libelle: this._libelle,
      idFiliale: this._idFiliale,
      codeFiliale: this.codeFiliale,
      documentUrl: this._documentUrl,
      souscriptionUrl: this._urlSouscription,
      codeFilialePaiement: this.codeFilialePaiement,
      urlVideoPublicitaire: this._urlVideoPublicitaire,
      ixpertaPayHostname: this._urlIxpertaPay,
      ixpertaPayApiKey: this._ixpertaPayKey,
    }
  }
}

export interface IFilialeJsonFormat {
  apiUrl: string,
  devise: string,
  libelle: string,
  idFiliale: number,
  codeFiliale: string,
  documentUrl: string,
  codeFilialePaiement: string,
  urlVideoPublicitaire: string,
  souscriptionUrl?: string
  ixpertaPayHostname?: string,
  ixpertaPayApiKey?: string
}

export interface IFiliale {
  filiale: string,
  icon: FilialeIcon,
  codeFiliale: string
  devise:string,
  fileDirPath: string,
  hostname:string,
  souscriptionUrl: string
}
