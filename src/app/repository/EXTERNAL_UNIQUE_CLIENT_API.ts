import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APP_STORAGE_KEY } from "../config/config";
import { StoreService } from "../providers/store.service";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ExternalUniqueClientApi {

  constructor(
    private _store: StoreService,
    private _httpClient: HttpClient) {}

  listPoliceByUniqueClientNumber(clientNumber: number): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .get(`${apiUrl}/GetPolicesClientUnique?numeroClientUnique=${clientNumber}`)
    }

  contratDetailByNumberPolice(policeId: number): Observable<any> {
    const queryBody = {NumeroPolice: policeId}
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .post(`${apiUrl}/DetailDescriptionPolice`, queryBody)
    }

  getClientUniqueIndividuels(queryBody: any): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .post(`${apiUrl}/GetPorteuilleClientApporteur`, queryBody)
    }

  searchClientApportIndividuel(queryBody: any): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .post(`${apiUrl}/GetClientUniqueIndividuels`, queryBody)
    }

  countClientApportIndividuel(codeApporteur: number): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .get(`${apiUrl}/GetNombreClientIndividuelApporteur?numeroApporteur=${codeApporteur}`)
    }

  getClientUniqueIndividuelsApporteur(queryBody: any): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .post(`${apiUrl}/GetPorteuilleClientApporteur`, queryBody)
    }

  getReglementsPrestationByPolice(queryBody: any): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .post(`${apiUrl}/ReglementsPrestationByPolice`, queryBody)
    }

  tauxEngagementByPolice(queryBody: any): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .get(`${apiUrl}/GetTauxEngagementPoliceIndividuelle?numeroPolice=${queryBody}`)
    }

  tauxEngagementByUniqueClient(queryBody: any): Observable<any> {
    const apiUrl = this._store.storeValue(APP_STORAGE_KEY.FILIALE).souscriptionUrl
    return this._httpClient
      .get(`${apiUrl}/GetTauxEngagementGlobalIndividuelClientUnique?numeroClientUnique=${queryBody}`)
    }
}
