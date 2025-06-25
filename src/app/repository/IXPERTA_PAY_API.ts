import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IExtranetPaiementMobile } from "../core/adaptors/IExtranetPaiementMobile";
import { environment } from "src/environments/environment.prod";
import { IPaymentIntegratorApiAdaptor } from "../core/adaptors/PaymentIntegratorApiAdaptor";
import { StoreService } from "../providers/store.service";
import { APP_STORAGE_KEY } from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class IXPERTA_PAY_API implements IPaymentIntegratorApiAdaptor{
  apiUrl:string
  httpHeader: any

  constructor(
    private _store: StoreService,
    private httpClient:HttpClient){
      const apiKey = this._store.storeValue(APP_STORAGE_KEY.FILIALE).ixpertaPayApiKey
      this.httpHeader = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Api-Key': apiKey
        })
      }
    }

  intentPay(queryBody: object): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).ixpertaPayHostname
    return this.httpClient
      .post<any>(`${apiUrl}/api/TransactionOperateur`, queryBody, this.httpHeader)
      .toPromise()
  }

  verifyPaymentStatus(queryBody: object): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).ixpertaPayHostname
    return this.httpClient
      .post<any>(`${apiUrl}/api/CheckTransactionOperateur`, queryBody, this.httpHeader)
      .toPromise()
  }

}

