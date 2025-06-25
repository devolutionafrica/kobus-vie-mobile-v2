import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IPaymentIntegratorApiAdaptor } from '../core/adaptors/PaymentIntegratorApiAdaptor';
import { StoreService } from '../providers/store.service';
import { APP_STORAGE_KEY } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class WAVE_PAY_API {


  constructor(private httpClient: HttpClient,private _store:StoreService,) {}

  intentPay(queryBody: any): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${queryBody.apiKey}`
      }),
    };
    return this.httpClient
      .post<any>(`${apiUrl}/IntentWaveApi`, queryBody, httpHeader)
      .toPromise();
  }

 

  verifyPaymentStatus(queryBody: any): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${queryBody.apiKey}`
      }),
    };

    return this.httpClient
    .post<any>(`${apiUrl}/CheckStatusWavePayment`, queryBody, httpHeader)
    .toPromise();
  }
}
