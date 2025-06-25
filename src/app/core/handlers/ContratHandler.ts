import { BehaviorSubject } from 'rxjs';
import { IContratClient } from './../entities/ContratClient';
import { IExtranetAdaptor } from '../adaptors/IExtranetAdaptor';
import { ClientContratFactory } from '../factory/ClientContratFactory';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { ContratFullDetailFactory } from '../factory/ContratFullDetailFactory';
import { SessionService } from 'src/app/providers/session.service';

export abstract class ContratHandler {

  message = '';
  contrats: IContratClient[];
  contratsBehaviorSubject: BehaviorSubject<IContratClient[]>;

  constructor(
    private session: SessionService,
    private apiUrl: IExtranetAdaptor) {
    this.contrats = this.session.storeValue(APP_STORAGE_KEY.CONTRATS) ? this.session.storeValue(APP_STORAGE_KEY.CONTRATS) : [];
    this.contratsBehaviorSubject = new BehaviorSubject<IContratClient[]>(this.contrats);
    }

  protected async loadContrats(queryBody: Object): Promise<IContratClient[]|boolean>{
    this.contrats = [];
    return await this.apiUrl.listContrat(queryBody)
      .then(
        contratsRawData => {
          console.log("contrat list data :::> ", contratsRawData)
          this.generateContratList(contratsRawData);
          this.updateBehaviorSubject();
          return  this.contrats as IContratClient[]|boolean;
        }
      );
    }

  protected searchContratByPoliceNumber(nuPolice: number): IContratClient|boolean{
    const searchResult = this.contrats
      .filter(
         contrat =>
          contrat._contrat.numeroContrat === nuPolice && ( contrat as IContratClient)
        );
    if (searchResult.length > 0) { return searchResult[0] as IContratClient; }
      else { return false; }
    }

  protected async getContratFullDetail(queryBody: any): Promise<IContratClient|boolean> {
    return await this.apiUrl.detailContrat(queryBody)
      .then(
        contratsRawData => {
          const nuContrat = parseInt(queryBody.NumeroContrat) as number;
          const searchResponse = this.searchContratByPoliceNumber(nuContrat);
          if (contratsRawData.Statut === 200 && searchResponse) {
            return ContratFullDetailFactory.build(contratsRawData,  searchResponse as IContratClient);
          } else { return false; }
        }
      )
      .catch(error => false);
    }

  protected generateContratList(contrats: any){
    for (const contrat of contrats.ProduitPoliceMontantCotisationMobile) {
      this.createEndPushContratInstance(contrat);
    }
    }

  protected updateBehaviorSubject() {
    this.contratsBehaviorSubject.next(this.contrats);
    }

  protected createEndPushContratInstance(jsonData: any) {
    this.contrats.push(ClientContratFactory.build(jsonData));
    }


  protected getSpecifyContratListNumber(nuEls: number): IContratClient[] {
    const currentList: IContratClient[] = [];
    for (let i = 0; i < nuEls; i++) {
      if (this.contrats[i] !== undefined) {
        currentList.push(this.contrats[i]);
      }
    }
    return currentList;
    }

  protected saveQuittencePay(data: any): Promise<any> {
    const quittances = []
    let currentParms = data
    for(const item of data.Quittances) {
      const current = {
        MontantEmis: item.montantQuittance,
        NumeroPolice: item.numeroPolice,
        NumeroQuittance: item.numeroQuittance
      }
      quittances.push(current)
    }

    currentParms.Quittances = quittances
    console.log('quittances :::> ', currentParms)
    return this.apiUrl.savePrimeOperationPay(data)
      .then(
        resp => {
          return resp;
        }
      );
    }

  protected modeReglementAndTelephone(data: any): Promise<any> {
      return this.apiUrl.contratInfo(data)
        .then(
          resp => {
            const info = {
              modeReglement: resp.ModeReglement[0],
              telephones: resp.Telephones
            }
            return info
          }
        )
    }
}
