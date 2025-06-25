import { IGoogleAuthUserInfo } from './../factory/GoogleAuthUserInfoFactory';
import { GoogleAuthUserInfoHandler } from './../handlers/GoogleAuthUserInfoHandler';
import { Injectable } from "@angular/core";
@Injectable(
  {
    providedIn: 'root'
  }
)
export class GoogleAuthUserInfoService extends GoogleAuthUserInfoHandler {

  constructor(){
    super()
  }

  public googleSignIn():Promise<IGoogleAuthUserInfo|boolean>{
      return this.authUser()
    }
}
