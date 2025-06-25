export interface IExtranetAuthentificationAdaptor {
  auth(queryBody:Object):Promise<boolean>
  disconnect():void
}
