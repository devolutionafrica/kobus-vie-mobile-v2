import { Injectable } from '@angular/core';
import { KKaipayHandler } from '../handlers/KKaipayHandler';
import { IkkaipayOption, KKAIPAY_API } from 'src/app/repository/KKAIPAY_API';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class KkaipayService extends KKaipayHandler{

  constructor(private kkaipayApi: KKAIPAY_API) {
    super(kkaipayApi);
  }

  debitMoney(queryBody: any): Promise<any> {
      throw new Error('Transaction Not Found');
    }

  verifyPaymentStatus(queryBody: IkkaipayOption): Promise<any> {
      return this.verifyStatus(queryBody)
    }

}
