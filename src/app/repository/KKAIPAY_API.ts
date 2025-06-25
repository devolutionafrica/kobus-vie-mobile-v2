import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPaymentIntegratorApiAdaptor } from '../core/adaptors/PaymentIntegratorApiAdaptor';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class KKAIPAY_API implements IPaymentIntegratorApiAdaptor{

  urlAPI: string = environment.kkiapayHostname;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-api-key': 'b6e50f80987611ebb611b7e676b55ada',
      'x-secret-key': 'tsk_b6e53691987611ebb611b7e676b55ada',
      'x-private-key': 'tpk_b6e53690987611ebb611b7e676b55ada',
    })
  };

  constructor(
    private httpClient: HttpClient){}

  intentPay(queryBody: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  verifyPaymentStatus(queryBody: IkkaipayOption): Promise<any> {
    return this.httpClient
      .post<any>(`${this.urlAPI}/transactions/status`, queryBody, this.httpHeader)
      .toPromise();
  }

}


export interface IkkaipayOption {
  transactionId: string
}

// export enum EndPointAPI {
//   transactionEndpoint= '/api/v1/transactions/status',
//   revertEndpoint= '/api/v1/transactions/revert',
//   payoutEndpoint= '/merchant/payouts/schedule',
// }
