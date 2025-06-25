import { BehaviorSubject } from 'rxjs';
import { ISimulationProduit } from './../entities/SimulationProduit';
import { SimulationProduitFactory } from './../factory/SimulationProduitFactory';
import { IExtranetSouscriptionAdaptor } from '../adaptors/IExtranetSouscriptionAdaptor';

export abstract class SimulationProduitHandler {
  message:string = ""
  simulateProduitBehaviorSubject:BehaviorSubject<ISimulationProduit>
  constructor(
    private souscriptionAPI:IExtranetSouscriptionAdaptor){
      this.simulateProduitBehaviorSubject = new BehaviorSubject<ISimulationProduit>(null)
    }

  protected async simulatePropostion(queryBody:object):Promise<ISimulationProduit|boolean>{
    return await this.souscriptionAPI.simulateProposition(queryBody)
      .then(
        rawData => {
          if (rawData.Success){
            return this.createSimulationProduitJsonFormat(rawData)
            }
          return rawData.Success
        }
      )
    }

  private createSimulationProduitJsonFormat(rawDataSimulation:object):ISimulationProduit{
    let simulationProduit = SimulationProduitFactory.build(rawDataSimulation)
    return simulationProduit.toJson()
    }
}
