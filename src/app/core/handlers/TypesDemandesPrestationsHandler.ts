import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { StoreService } from "src/app/providers/store.service";
import { TypeDemandesPrestation } from "../entities/TypeDemandesPrestations";
import { IExtranetAppConfigAdaptor } from "../adaptors/IExtranetConfigAdaptor";
import { TypeDemandesPrestationFactory } from './../factory/TypeDemandesPrestationFactory';
import { APP_STORAGE_KEY } from "src/app/config/config";

export abstract class TypeDemandesPrestationhandler {

  message:string = ""
  typeDemandePrestation:TypeDemandesPrestation[] = []
  typeDemandePrestationBehaviorSubject: BehaviorSubject<TypeDemandesPrestation[]>

  constructor(
    private store:StoreService,
    private appConfigAPI:IExtranetAppConfigAdaptor){
      if(this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)){
        const storeData = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
        this.typeDemandePrestation = storeData.operators ? this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).operators : []
      }
      this.typeDemandePrestationBehaviorSubject = new BehaviorSubject<TypeDemandesPrestation[]>(this.typeDemandePrestation)
    }

  protected async loadTypeDemandePrestation():Promise<TypeDemandesPrestation[]>{
    return await this.appConfigAPI.listModePrestation()
      .then(
        typePrestationRawData => {
          this.generateTypeDemandesPrestationList(typePrestationRawData)
          this.updateBehaviorSubject()
          return this.typeDemandePrestation
        }
      )
    }

  protected updateBehaviorSubject(){
    this.typeDemandePrestationBehaviorSubject.next(this.typeDemandePrestation)
  }

  protected generateTypeDemandesPrestationList(rawData:any){
    for(let typeDemandePrestation of rawData.DemandesPrestationsTypes)
        this.createEndPushTypeDemandesPrestationInstance(typeDemandePrestation)
    }

  protected createEndPushTypeDemandesPrestationInstance(jsonData:any){
    this.typeDemandePrestation.push(TypeDemandesPrestationFactory.build(jsonData))
  }
}
