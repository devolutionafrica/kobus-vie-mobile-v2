import { IPaymentIntegratorApiAdaptor } from './../adaptors/PaymentIntegratorApiAdaptor';
import { IHub2PayProcessResponse, IHub2PayProcessQueryBody } from './../factory/Hub2PayProcessFactory';
import { Hub2InitPayFactory, IHub2InitPayQueryBody, IHub2InitPayResponse } from '../factory/Hub2PayFactory';
import { Hub2PayProcessFactory } from '../factory/Hub2PayProcessFactory';

export abstract class Hub2PayHandler {
  message = '';

  constructor(
    private payAPI: IPaymentIntegratorApiAdaptor){}

  protected async debitMoney(queryBody: IHub2InitPayQueryBody): Promise<IHub2InitPayResponse>{
    return await this.payAPI.intentPay(queryBody)
      .then(
        payResponse => {
          console.log('payPrime :::> ', payResponse)
          this.message = payResponse.Message;
          return this.createPaiementMobileFactory(payResponse);
        }
      );
    }

  protected async verifyOperationMoney(queryBody: IHub2PayProcessQueryBody): Promise<IHub2PayProcessResponse>{
    return await this.payAPI.verifyPaymentStatus(queryBody)
      .then(
        payResponse => {
          console.log("resp operation :::> ", payResponse);
          this.message = payResponse.Message;
          return this.createPayProcessFactory(payResponse);
        }
      );
    }


  private createPaiementMobileFactory(jsonData: object): IHub2InitPayResponse{
      return Hub2InitPayFactory.build(jsonData);
    }

  private createPayProcessFactory(jsonData: object): IHub2PayProcessResponse{
      return Hub2PayProcessFactory.build(jsonData);
    }

}
