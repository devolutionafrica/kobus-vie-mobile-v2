import { Injectable } from "@angular/core";
import { IResult } from "src/app/models/model";
import { ISimulationDemandePrestation } from "src/app/models/prestation.model";
import { EXTRANET_CLIENT_API } from 'src/app/repository/EXTRANET_CLIENT_API';
import { SimulationDemandePrestationHandler } from './../handlers/SimulationDemandePrestationHandler';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SimulationDemandePrestationService extends SimulationDemandePrestationHandler{

  constructor(
    private extranetAPI:EXTRANET_CLIENT_API){
      super(extranetAPI)
    }

  simulationDemandePrestation(type:string, queryBody:Object):Promise<IResult<ISimulationDemandePrestation>>{
    return this.simulationDemande(type, queryBody)
  }
}
