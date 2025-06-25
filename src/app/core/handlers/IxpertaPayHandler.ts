import { BehaviorSubject } from 'rxjs';
import { PaiementMobile } from '../entities/PaiementMobile';
import { IPaymentIntegratorApiAdaptor } from './../adaptors/PaymentIntegratorApiAdaptor';

export abstract class IxpertaPayMobileHandler {
  message:string = ""
  payPrime:PaiementMobile
  payPrimeBehaviorSubject: BehaviorSubject<PaiementMobile>

  constructor(
    private payAPI:IPaymentIntegratorApiAdaptor){
      this.payPrimeBehaviorSubject = new BehaviorSubject<PaiementMobile>(null)
    }

  protected async debitMoney(queryBody:Object):Promise<any>{
    return await this.payAPI.intentPay(queryBody)
      .then(
        payResponse => {
          this.message = payResponse.Message
          return this.createPaiementMobileObject(payResponse)
        }
      )
    }

  private createPaiementMobileObject(jsonData: any){
    return {
      statutTransaction: jsonData.CodeStatutTransaction,
      codeStatutTransaction: jsonData.StatutTransaction,
      numero: jsonData.numero,
      message: jsonData.Message,
      montant : jsonData.montant,
      operateur: jsonData.operateur,
      refId: jsonData.reftransaction,
      refTransaction: jsonData.ReferenceId,
    }
  }

  protected async checkTransactionStatus(queryBody: any): Promise<any> {
    return await this.payAPI.verifyPaymentStatus(queryBody)
    .then(resp => resp)
  }
}
