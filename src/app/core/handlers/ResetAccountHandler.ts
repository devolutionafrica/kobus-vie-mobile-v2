import { ResetAccountResponseFactory } from './../factory/ResetAccountResponseFactory';
import { BehaviorSubject } from 'rxjs';
import { IExtranetAdaptor } from '../adaptors/IExtranetAdaptor';
import { IResetAccountData } from '../factory/ResetAccountResponseFactory';
export abstract class ResetAccountHandler {
  message:string = ""
  resetAccountBehaviorSubject:BehaviorSubject<IResetAccountData>

  constructor(private extranetAPI:IExtranetAdaptor){
      this.resetAccountBehaviorSubject = new BehaviorSubject<IResetAccountData>(null)
    }

  protected async resetUserAccount(queryBody:Object):Promise<IResetAccountData|boolean>{
    return await this.extranetAPI.resetAccount(queryBody)
      .then(
        resetRawData => {
          if (resetRawData.Statut === 200)
            return ResetAccountResponseFactory.build(resetRawData)
          return false
        }
      )
  }
}
