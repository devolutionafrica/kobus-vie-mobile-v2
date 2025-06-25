import { Injectable } from '@angular/core';
import { EXTRANET_CLIENT_API } from 'src/app/repository/EXTRANET_CLIENT_API';
import { DemandePrestation } from '../entities/DemandePrestation';
import { DemandePrestationHandler } from "../handlers/DemandePrestationHandler";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DemandePrestationService extends DemandePrestationHandler {

  constructor(
    private extranetAPI:EXTRANET_CLIENT_API){
      super(extranetAPI)
    }

  getDemandePrestation(queryBody:Object):Promise<DemandePrestation[]>{
    return this.loadDemandePrestations(queryBody)
  }

  saveDemandePrestation(queryBody:Object):Promise<DemandePrestation>{
    return this.addDemandePrestation(queryBody)
  }
}
