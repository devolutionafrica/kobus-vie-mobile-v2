import { BehaviorSubject } from 'rxjs';
import { ModeReglement } from "../entities/ModeReglement";
import { StoreService } from "src/app/providers/store.service";
import { ModeReglementFactory } from '../factory/ModeReglementFactory';
import { environment } from './../../../environments/environment.prod';
import { IExtranetAppConfigAdaptor } from "../adaptors/IExtranetConfigAdaptor";
import { APP_STORAGE_KEY } from 'src/app/config/config';

export abstract class ModeReglementHandler {
  message:string = ""
  modeReglement:ModeReglement[] = []
  modeReglementBehaviorSubject:BehaviorSubject<ModeReglement[]>
  constructor(
    private store:StoreService,
    private appConfigAPI:IExtranetAppConfigAdaptor){
      if(this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)){
        const storeData = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
        this.modeReglement = storeData.modePayList ? this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).modePayList : []
      }
      this.modeReglementBehaviorSubject = new BehaviorSubject<ModeReglement[]>(this.modeReglement)
    }

  protected async loadModeReglement():Promise<ModeReglement[]>{
    this.modeReglement = []
    return await this.appConfigAPI.listModeReglement()
      .then(
        modeReglementRawData => {
          this.generateModeReglementList(modeReglementRawData)
          this.updateBehaviorSubject()
          return this.modeReglement
        }
      )
    }

  protected updateBehaviorSubject(){
    this.modeReglementBehaviorSubject.next(this.modeReglement)
  }

  protected generateModeReglementList(rawData:any){
      for(let mode of rawData.ModeReglements){
        console.log('mode de reglement :::> ', mode)
        mode.Identifiant !== 'E' && this.createEndPushModeReglementInstance(mode)
      }
    }

  protected createEndPushModeReglementInstance(jsonData:any){
    this.modeReglement.push(ModeReglementFactory.build(jsonData))
  }
}
