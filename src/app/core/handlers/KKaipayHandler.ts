import { IkkaipayOption } from 'src/app/repository/KKAIPAY_API';
import { IPaymentIntegratorApiAdaptor } from '../adaptors/PaymentIntegratorApiAdaptor';

export abstract class KKaipayHandler {

  message = '';
  constructor(
    private payAPI: IPaymentIntegratorApiAdaptor
  ){}

  protected async verifyStatus(queryBody: IkkaipayOption): Promise<any>{
    return await this.payAPI.verifyPaymentStatus(queryBody)
      .then(
        payResponse => {
          return payResponse;
        }
      )
      .catch(
        error => {
          return {status: 'TRANSACTION_NOT_FOUND'};
        }
      );
    }

}
