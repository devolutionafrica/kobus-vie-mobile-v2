import { BehaviorSubject } from "rxjs";
import { APP_STORAGE_KEY } from "src/app/config/config";
import { IFilialeJsonFormat } from "../entities/Filiale";
import { FilialeFactory } from "../factory/FilialeFactory";
import { StoreService } from "src/app/providers/store.service";
import { environment } from './../../../environments/environment.prod';
import { IExtranetAppConfigAdaptor } from "../adaptors/IExtranetConfigAdaptor";

export abstract class FilialeHandler {

  message:string = ""
  filiales:IFilialeJsonFormat[] = []
  filialeBehaviorSubject: BehaviorSubject<IFilialeJsonFormat[]>

  constructor(
    private store:StoreService,
    private appConfigAPI:IExtranetAppConfigAdaptor) {
      if(this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)){
        const storeData = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
        this.filiales = storeData.filiales ? this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).filiales : []
      }
      this.filialeBehaviorSubject = new BehaviorSubject<IFilialeJsonFormat[]>(this.filiales)
    }

    protected async loadFiliale():Promise<IFilialeJsonFormat[]>{
      return await this.appConfigAPI.listFiliale(environment.hostnameFiliale)
        .then(
          filialeRawData => {
            this.generateFilialeList(filialeRawData)
            this.updateBehaviorSubject()
            return this.filiales
          }
        )
      }

    protected updateBehaviorSubject(){
        this.filialeBehaviorSubject.next(this.filiales)
      }

    protected generateFilialeList(rawData:any){
      this.filiales = [];
      for(let filiale of rawData.Filiale)
        this.createEndPushFilialeInstance(filiale)
      }

    protected createEndPushFilialeInstance(jsonData:any){
        this.filiales.push(FilialeFactory.build(jsonData))
      }
}
