import { Injectable } from '@angular/core'
import { SessionService } from 'src/app/providers/session.service'
import { EXTRANET_CLIENT_API } from 'src/app/repository/EXTRANET_CLIENT_API'
import { IExtranetAuthentificationAdaptor } from '../adaptors/IExtranetAuthentificationAdaptor'
import { AuthentificationHandler } from '../handlers/AuthentificationHandler'
import { EXTRANET_CONFIG_API } from 'src/app/repository/EXTRANET_CONFIG_API'

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthentificationService extends AuthentificationHandler
  implements IExtranetAuthentificationAdaptor{

  constructor(
    session: SessionService,
    private extranetAPI: EXTRANET_CLIENT_API, private extranetConfigAPI:EXTRANET_CONFIG_API) {
    super(session, extranetAPI,extranetConfigAPI);
  }

  auth(queryBody: Object): Promise<boolean> {
    return this.signIn(queryBody);
  }
  codeApporteurVerif(queryBody: Object): Promise<boolean> {
    return this.codeApporteurVerification(queryBody);
  }
  isFirstConnexion(): boolean {
    return this.isUserFirstConnexion();
  }

  createNewPassword(queryData: Object): Promise<any> {
    return this.extranetAPI.updateUserPassword(queryData)
  }

  disconnect(){
    this.logOut();
  }

}
