import { BehaviorSubject } from 'rxjs'
import { IExtranetAdaptor } from '../adaptors/IExtranetAdaptor'
import { DemandePrestation } from '../entities/DemandePrestation'
import { DemandePrestationFactory } from '../factory/DemandePrestationFactory'

export abstract class DemandePrestationHandler {

  demandePrestations: DemandePrestation[] = [];
  demandePrestationBehaviorSubject: BehaviorSubject<DemandePrestation[]>;

  constructor(
    private urlAPI: IExtranetAdaptor){
      this.demandePrestationBehaviorSubject = new BehaviorSubject<DemandePrestation[]>(this.demandePrestations);
    }

  protected async loadDemandePrestations(queryBody: any): Promise<DemandePrestation[]>{
    return await this.urlAPI.listPrestation(queryBody)
      .then(
        demandePrestationRawData => {
          this.demandePrestations = [];
          this.generateDemandePrestationList(queryBody.NumeroContrat, demandePrestationRawData.ListDemande);
          this.updateBehaviorSubject();
          return this.demandePrestations;
        }
      );
    }


  protected async addDemandePrestation(queryBody: Object): Promise<DemandePrestation>{
    return await this.urlAPI.addPrestation(queryBody)
    .then(
      demandePrestationRawData => {
          return demandePrestationRawData
        }
      );
    }


  private generateDemandePrestationList(nuContrat: string, rawDemandePrestation: []){
      for (const prestation of rawDemandePrestation) {
        this.createEndPushDemandePrestationInstance(nuContrat, prestation);
      }
    }

  private updateBehaviorSubject(){
      this.demandePrestationBehaviorSubject.next(this.demandePrestations);
    }

  private createEndPushDemandePrestationInstance(nuContrat: string, jsonData: any) {
    const demandePrestation = DemandePrestationFactory.build(jsonData);
    const codeContrat: string = demandePrestation.toJson().police;
    if (codeContrat === nuContrat) {
      this.demandePrestations.push(demandePrestation);
    }
  }

}
