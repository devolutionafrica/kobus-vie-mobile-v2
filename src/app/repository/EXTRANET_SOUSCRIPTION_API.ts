import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExtranetSouscriptionAdaptor } from '../core/adaptors/IExtranetSouscriptionAdaptor';
import { StoreService } from '../providers/store.service';
import { APP_STORAGE_KEY } from '../config/config';

@Injectable(
  {
  providedIn: 'root'
}
)
export class EXTRANET_SOUSCRIPTION_API implements IExtranetSouscriptionAdaptor {
  urlAPI: string = '';
  constructor(private store: StoreService, private httpClient: HttpClient) {}

  saveTransaction(queryBody: any): Promise<any> {
    const apiUrl = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post<any>(`${apiUrl}/SaveTransction`, queryBody, {})
      .toPromise();
  }

  getListCapitalByPeriodicite(queryBody: any): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/ListeCapitauxParPeriodicite`, queryBody)
      .toPromise();
  }

  getGarantieFacultativeAmount(queryBody: any): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/ListeCapitauxFacultativeParGarantie`, queryBody)
      .toPromise();
  }

  loadDateEffets(): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient.get(`${urlAPI}/ListeDateEffetPolice`).toPromise();
  }

  definitionProduit(): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient.get(`${urlAPI}/DefinitionProduits`).toPromise();
  }

  loadDefaultCodeApporteur(): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient.get(`${urlAPI}/ApporteurBureauDirect`).toPromise();
  }

  loadDureeContrats(queryBody: any): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/ListeDureePolice`, queryBody)
      .toPromise();
  }

  simulateProposition(queryBody: any): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/SimulateProposition`, queryBody)
      .toPromise();
  }

  createContrat(queryBody: object): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/CreatePropositionVie`, queryBody)
      .toPromise();
  }

  createContratByFile(queryBody: object): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/CreatePropositionVieWithDocuments`, queryBody)
      .toPromise();
  }

  saveCotation(queryBody: object): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/SaveCotationVie`, queryBody)
      .toPromise();
  }

  validateProposition(queryBody: any): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/ValidationCotationVie`, queryBody)
      .toPromise();
  }

  findProposition(queryBody: any): Promise<any> {
    const urlAPI = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).souscriptionUrl;
    return this.httpClient
      .post(`${urlAPI}/GetListeCotations`, queryBody)
      .toPromise();
  }
}
