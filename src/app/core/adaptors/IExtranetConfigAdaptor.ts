export interface IExtranetAppConfigAdaptor {
  cgu():Promise<any>
  verificationCodeApporteur(queryBody: Object): Promise<any>;
  listAgence():Promise<any>
  listIntegrateur():Promise<any>
  listPeriodicity():Promise<any>
  listModeReglement():Promise<any>
  listModePrestation():Promise<any>
  listFiliale(queryBody:Object):Promise<any>
  listMobileOperator(queryBody:Object):Promise<any>
}
