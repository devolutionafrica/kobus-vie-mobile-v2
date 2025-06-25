import { BehaviorSubject } from 'rxjs';

import { APP_STORAGE_KEY } from 'src/app/config/config';
import { StoreService } from "src/app/providers/store.service";
import { IIntegrateur, IntegrateurFactory } from './../factory/IntegrateurFactory';
import { IExtranetAppConfigAdaptor } from "../adaptors/IExtranetConfigAdaptor";

export class IntegrateurHandler {

  apiUrl: string = ""
  message: string = ''
  integrateur: IIntegrateur[];
  integrateurBehaviorSubject: BehaviorSubject<IIntegrateur[]>;

  constructor(
    private store: StoreService,
    private apiService: IExtranetAppConfigAdaptor){
      if (this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)){
        const storeData = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
        this.integrateur = storeData.integrators ? this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).integrators : [];
      } else this.integrateur = []
      this.integrateurBehaviorSubject = new BehaviorSubject<IIntegrateur[]>(this.integrateur);
    }
    protected async loadIntegrators(): Promise<IIntegrateur[]>{
      return await this.apiService.listIntegrateur()
        .then(
          operators => {
            const data=this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
            this.generateIntegrateurList(operators.ListIntegrateurPaiement);
            this.updateBehaviorSubject();
            return this.integrateur;
          }

        )
      }

    protected updateBehaviorSubject(){
        this.integrateurBehaviorSubject.next(this.integrateur);
      }

    protected generateIntegrateurList(rawData: any){
      this.integrateur = []
      for (const operator of rawData) {
          operator.IS_ACTIF && this.createEndPushIntegratorInstance(operator)
        }
      }

    protected createEndPushIntegratorInstance(jsonData: any){
        this.integrateur.push(IntegrateurFactory.build(jsonData));
      }

    protected cleanStorageIntegrateur(){
        const appConfig = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
        appConfig.operators = [];
        this.store.dispatch(APP_STORAGE_KEY.APP_CONFIG, appConfig);
      }
}
