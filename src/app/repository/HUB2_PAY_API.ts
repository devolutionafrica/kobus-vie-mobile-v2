import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IPaymentIntegratorApiAdaptor } from '../core/adaptors/PaymentIntegratorApiAdaptor';

@Injectable({
  providedIn: 'root'
})
export class HUB2_PAY_API implements IPaymentIntegratorApiAdaptor{

  urlAPI: string = environment.hub2Hostname;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-autho-kobus-cli': 'kb-01fviUe@478As==40'
    })
  };

  constructor(
    private httpClient: HttpClient){}

  intentPay(queryBody: object): Promise<any> {
      return this.httpClient
      .post<any>(`${this.urlAPI}/InitializePayment`, queryBody, this.httpHeader)
      .toPromise();
    }

  verifyPaymentStatus(queryBody: object): Promise<any> {
      return this.httpClient
        .post<any>(`${this.urlAPI}/ConfirmePayment`, queryBody, this.httpHeader)
        .toPromise();
    }
}


