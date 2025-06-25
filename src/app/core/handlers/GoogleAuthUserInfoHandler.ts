//import { Plugins } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';
import {
  GoogleAuthUserInfoFactory,
  IGoogleAuthUserInfo } from './../factory/GoogleAuthUserInfoFactory';

export abstract class GoogleAuthUserInfoHandler {

  constructor(){}

  public async authUser():Promise<IGoogleAuthUserInfo|boolean> {
    try {
      return await SocialLogin.login({ provider: 'google', options: {} })
        .then(
          response => {
            return GoogleAuthUserInfoFactory.build(response)
          }
        );
    } catch (error) {
      console.log('error detected :::> ', error)
      return false }
  }
}
