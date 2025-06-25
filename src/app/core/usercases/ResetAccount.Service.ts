import { Injectable } from '@angular/core';
import { EXTRANET_CLIENT_API } from 'src/app/repository/EXTRANET_CLIENT_API';
import { ResetAccountHandler } from '../handlers/ResetAccountHandler';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ResetAccountService extends ResetAccountHandler {

  constructor(extranetAPI:EXTRANET_CLIENT_API){
      super(extranetAPI)
    }

  resetAccount(queryBody:Object):Promise<any>{
      return this.resetUserAccount(queryBody)
    }
}
