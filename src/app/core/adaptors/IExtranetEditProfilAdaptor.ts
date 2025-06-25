export interface IExtranetEditProfilAdaptor {
  userProfil(queryBody:Object):Promise<any>
  updateUserProfil(queryBody:Object):Promise<any>
}
