import { TypeDemandesPrestation } from './../entities/TypeDemandesPrestations';
import { EXTRANET_CONFIG_API } from 'src/app/repository/EXTRANET_CONFIG_API';
import { TypeDemandesPrestationhandler } from './../handlers/TypesDemandesPrestationsHandler';
import { Injectable } from "@angular/core";
import { StoreService } from 'src/app/providers/store.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TypeDemandePrestationService extends TypeDemandesPrestationhandler {

  constructor(
    store:StoreService,
    appConfigAPI:EXTRANET_CONFIG_API){
      super(store, appConfigAPI)
    }

  getTypeDemandePrestations():Promise<TypeDemandesPrestation[]>{
    return this.loadTypeDemandePrestation()
  }
}
