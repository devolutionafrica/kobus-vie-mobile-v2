import { BehaviorSubject } from 'rxjs'
import { OperateurMobile } from '../entities/Operateur'
import { StoreService } from 'src/app/providers/store.service'
import { OperateurMobileFactory } from './../factory/OperateurMobileFactory';
import { IExtranetAppConfigAdaptor } from '../adaptors/IExtranetConfigAdaptor';
import { APP_STORAGE_KEY } from 'src/app/config/config';

export class OperateurMobileHandler {

  message = ''
  operateurMobiles: OperateurMobile[];
  operateurMobileBehaviorSubject: BehaviorSubject<OperateurMobile[]>;

  constructor(
    private store: StoreService,
    private appConfigAPI: IExtranetAppConfigAdaptor) {
      if (this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)){
        const storeData = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
        this.operateurMobiles = storeData.operators ? this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).operators : [];
      } else this.operateurMobiles = []
      this.operateurMobileBehaviorSubject = new BehaviorSubject<OperateurMobile[]>(this.operateurMobiles);
    }

  protected async loadMobilOperators(): Promise<OperateurMobile[]>{
    const codeFiliale = this.store.storeValue(APP_STORAGE_KEY.FILIALE).codeFiliale;
    const queryBody = {'Filliale': codeFiliale};
    return await this.appConfigAPI.listMobileOperator(queryBody)
      .then(
        operators => {
          this.generateOperatorList(operators);
          this.updateBehaviorSubject();
          return this.operateurMobiles;
        }
      );
    }

  protected updateBehaviorSubject(){
      this.operateurMobileBehaviorSubject.next(this.operateurMobiles);
    }

  protected generateOperatorList(rawData: any){
    this.operateurMobiles = []
    for (const operator of rawData) {
        this.createEndPushOperatorInstance(operator)
      }
    }

  protected createEndPushOperatorInstance(jsonData: any){
      this.operateurMobiles.push(OperateurMobileFactory.build(jsonData));
    }

  protected cleanStorageOperator(){
      const appConfig = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
      appConfig.operators = [];
      this.store.dispatch(APP_STORAGE_KEY.APP_CONFIG, appConfig);
    }
}
