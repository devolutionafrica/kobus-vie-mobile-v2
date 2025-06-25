export interface IExtranetUtilisateurAdaptor<T> {
  loadProfil(queryBody:Object):Promise<T>
  updateProfil(queryBody:Object):Promise<T>
}
