import { IAgence } from './../core/factory/AgencesFactory';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IExtranetAppConfigAdaptor } from '../core/adaptors/IExtranetConfigAdaptor';
import { APP_STORAGE_KEY } from '../config/config';
import { StoreService } from '../providers/store.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EXTRANET_CONFIG_API implements IExtranetAppConfigAdaptor{
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(
    private _store: StoreService,
    private httpClient: HttpClient){}

  public listMobileOperator(queryBody: Object): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).ixpertaPayHostname
     return this.httpClient
       .post(`${apiUrl}/api/OperateurPays`, queryBody)
      .toPromise();
    // return null
    }

  public listFiliale(): Promise<any> {
    const apiUrl = environment.hostnameFiliale
    return this.httpClient
      .get(`${apiUrl}/api/Parameters`).toPromise();
    }

  public listIntegrateur(): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).hostname
    return this.httpClient
      .get(`${apiUrl}GetAllIntegrateurPaiement`)
      .toPromise();
    }

  public listPeriodicity(): Promise<any> {
     const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).hostname
  //   const apiUrl = 'https://testchapchapcm.groupensia.com/';
     console.log((apiUrl))
     return this.httpClient
       .post(`${apiUrl}GetListePeriodiciteRemboursement`, null).toPromise();
   }
    public verificationCodeApporteur(queryBody: Object): Promise<any> {
      const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).hostname
      return this.httpClient
        .post(`${apiUrl}CodeAgenceChecker`, queryBody, this.httpHeader)
        .toPromise().catch(
          e=>{
            console.log(e)
          }
        )
    }

  public listModeReglement(): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).hostname
    return this.httpClient
      .post<any>(`${apiUrl}GetReferencModeReglementType`, null)
      .toPromise();
    }

  public listModePrestation(): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).hostname
    return this.httpClient
      .post<any>(`${apiUrl}GetReferencePrestationByProduit`, null)
      .toPromise();
    }

  public cgu(): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).hostname
    return this.httpClient
      .post<any>(`${apiUrl}cgu`, null)
      .toPromise();
    }

  public listAgence(): Promise<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).hostname
    return this.httpClient
      .post<any>(`${apiUrl}GetAllAgences`, null)
      .toPromise();
    }
}
