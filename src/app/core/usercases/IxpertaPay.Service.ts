import { IPaymentIntegratorApiAdaptor } from './../adaptors/PaymentIntegratorApiAdaptor';
import { Injectable } from '@angular/core';
import { IXPERTA_PAY_API } from '../../repository/IXPERTA_PAY_API';
import { IxpertaPayMobileHandler } from './../handlers/IxpertaPayHandler';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class IxpertaPayService extends IxpertaPayMobileHandler implements IPaymentIntegratorApiAdaptor{

  constructor(
      payAPI: IXPERTA_PAY_API){
      super(payAPI);
    }

  intentPay(queryBody: object): Promise<any> {
    return this.debitMoney(queryBody);
  }

  verifyPaymentStatus(queryBody: object): Promise<any> {
    return this.checkTransactionStatus(queryBody);
  }
}
