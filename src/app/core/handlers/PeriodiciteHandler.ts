import { BehaviorSubject } from "rxjs";
import { Periodicite } from "../entities/Periodicite";
import { StoreService } from "src/app/providers/store.service";
import { PeriodiciteFactory } from "../factory/PeriodiciteFactory";
import { IExtranetAppConfigAdaptor } from "../adaptors/IExtranetConfigAdaptor";
import { APP_STORAGE_KEY } from "src/app/config/config";

export abstract class PeriodiciteHandler {

  message:string = ""
  periodiciteProduit:Periodicite[] = []
  periodiciteBehaviorSubject: BehaviorSubject<Periodicite[]>

  constructor(
    private store:StoreService,
    private appConfigAPI:IExtranetAppConfigAdaptor) {
      if(this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)){
        const storeData = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
        this.periodiciteProduit = storeData.periodicityList ? this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).periodicityList : []
      }
      this.periodiciteBehaviorSubject = new BehaviorSubject<Periodicite[]>(this.periodiciteProduit)
    }

    protected async loadPeriodicites():Promise<Periodicite[]>{
      return await this.appConfigAPI.listPeriodicity()
        .then(
          periodiciteRawData => {
            // console.log(1);
            
            this.generatePeriodiciteList(periodiciteRawData)
            this.updateBehaviorSubject()
            return this.periodiciteProduit
          }
        )
      }

    protected updateBehaviorSubject(){
        this.periodiciteBehaviorSubject.next(this.periodiciteProduit)
        // console.log(3);

      }

    protected generatePeriodiciteList(rawData:any){
      for(let periodicite of rawData)
        this.createEndPushPeriodiciteInstance(periodicite)
      }

    protected createEndPushPeriodiciteInstance(jsonData:any){
        this.periodiciteProduit.push(PeriodiciteFactory.build(jsonData))
        // console.log(2);

      }
}
