import { Injectable } from '@angular/core';
import { APP_STORAGE_KEY } from '../config/config';
import { StoreService } from '../providers/store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IExtranetAdaptor } from '../core/adaptors/IExtranetAdaptor';

@Injectable(
  {providedIn: 'root'  }
)
export class EXTRANET_CLIENT_API implements IExtranetAdaptor {
  urlAPI = '';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private store: StoreService, private httpClient: HttpClient) {}

  simulationDemande(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}GetEstimationPrestation`, queryBody, this.httpHeader)
      .toPromise();
  }

  public authUser(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}Authentification`, queryBody, this.httpHeader)
      .toPromise();
  }

  public userProfil(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}Profil`, queryBody, this.httpHeader)
      .toPromise();
  }

  public resetAccount(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}MotDePasse`, queryBody, this.httpHeader)
      .toPromise();
  }

  public updateUserProfil(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}Profil/Update`, queryBody, this.httpHeader)
      .toPromise();
  }

  public listPrestation(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetDemandePrestationClientEnCours`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public addPrestation(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}EnregistrementPrestation`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public detailContrat(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetSituationCompteClientAndSinistre`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public listContrat(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetAllContratsAndCotisationWithCumul`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public listImpayes(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}GetListAllImpayes`, queryBody, this.httpHeader)
      .toPromise();
  }

  public downloadReleveCotisationPDF(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetPathReportReleveCotisation`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public downloadReleveCotisationBIN(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetReleveCotisationReportBytes`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public downloadAvisSituationPDF(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GenerateAvisSituationReport`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public downloadAvisSituationBIN(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}LoadAvisSituationReport`, queryBody, this.httpHeader)
      .toPromise();
  }

  public savePrimeOperationPay(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}SavePaiementPrime`, queryBody, this.httpHeader)
      .toPromise();
  }

  public listPeriodicity(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetListePeriodiciteRemboursement`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public listModePay(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetReferencModeReglementType`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public listModePrestation(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetReferencePrestationByProduit`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public downloadReleveCotisationBin(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetReleveCotisationReportBytes`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public downloadReleveCotisationFile(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}GetPathReportReleveCotisation`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public addPrestationRequest(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}EnregistrementPrestation`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public updateQuittenceAfterPay(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}EnregistrementPrestation`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public updateUserPassword(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(
        `${this.urlAPI}UpdateInfoFirstConnection`,
        queryBody,
        this.httpHeader
      )
      .toPromise();
  }

  public contratInfo(queryBody: Object): Promise<any> {
    this.urlAPI = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
    return this.httpClient
      .post(`${this.urlAPI}InfoPoliceService`, queryBody, this.httpHeader)
      .toPromise();
  }
}
