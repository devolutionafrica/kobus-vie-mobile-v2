import { IPaymentIntegratorApiAdaptor } from './../adaptors/PaymentIntegratorApiAdaptor';
import { Injectable } from '@angular/core';
import { HUB2_PAY_API } from 'src/app/repository/HUB2_PAY_API';
import { Hub2PayHandler } from '../handlers/Hub2PayHandler';
import { IHub2InitPayQueryBody, IHub2InitPayResponse } from '../factory/Hub2PayFactory';
import { IHub2PayProcessQueryBody, IHub2PayProcessResponse } from '../factory/Hub2PayProcessFactory';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class Hub2PayService extends Hub2PayHandler implements IPaymentIntegratorApiAdaptor{

  constructor(
      private extranetAPI: HUB2_PAY_API){
      super(extranetAPI);
    }

  intentPay(queryBody: IHub2InitPayQueryBody): Promise<IHub2InitPayResponse> {
      return this.debitMoney(queryBody);
    }

  verifyPaymentStatus(queryBody: IHub2PayProcessQueryBody): Promise<IHub2PayProcessResponse> {
      return this.verifyOperationMoney(queryBody);
    }
}
