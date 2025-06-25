import { ISimulationProduit } from './../entities/SimulationProduit';
import { SimulationProduitHandler } from './../handlers/SimulationProduitHandler';
import { Injectable } from "@angular/core";
import { EXTRANET_SOUSCRIPTION_API } from 'src/app/repository/EXTRANET_SOUSCRIPTION_API';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SimulationProduitService extends SimulationProduitHandler{

  constructor(
    souscriptionAPI:EXTRANET_SOUSCRIPTION_API){
      super(souscriptionAPI)
    }

  simulationProduit(queryBody:object):Promise<ISimulationProduit|boolean>{
      return this.simulatePropostion(queryBody)
    }
}
