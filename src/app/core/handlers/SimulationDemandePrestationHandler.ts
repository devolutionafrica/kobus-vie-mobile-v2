import { BehaviorSubject } from 'rxjs';
import { IExtranetAdaptor } from '../adaptors/IExtranetAdaptor';
import { SERVER_MESSAGE_MAX_LENGTH } from './../../config/config';
import { SimulationDemandePrestationFactory } from '../factory/SimulationDemandePrestationFactory';
import { IResult } from 'src/app/models/model';
import { ISimulationDemandePrestation } from 'src/app/models/prestation.model';

export abstract class SimulationDemandePrestationHandler {

  simulateMessage = ''
  simulation: ISimulationDemandePrestation;
  simulationBehaviorSubject: BehaviorSubject<ISimulationDemandePrestation>;
  constructor(
    private urlAPI: IExtranetAdaptor){
      this.simulationBehaviorSubject = new BehaviorSubject<ISimulationDemandePrestation>(null);
    }

  private async simulate(queryBody: Object): Promise<IResult<ISimulationDemandePrestation>>{
    return await this.urlAPI.simulationDemande(queryBody)
      .then(
        simulationResponse => {
          this.simulateMessage = simulationResponse.Message ? this.formatServerMessage(simulationResponse.Message) : "";
          if (this.verifySimulateStatus(simulationResponse)) {
            return {
              data: SimulationDemandePrestationFactory.build(simulationResponse) as ISimulationDemandePrestation,
              status: true,
              msg: ""
            }
          } return {
            data: null,
            status: false,
            msg: this.simulateMessage
          };
        }
      );
    }

  private verifySimulateStatus(simalateRawData: any): boolean {
    if (simalateRawData.isEligble || (simalateRawData.Montant > 0 && !simalateRawData.isEligble)) return true
    else return false
  }

  private formatServerMessage(message: string): string {
      const currentMsg = 'Oops!! une erreur est survenu, veuillez réessayer ultérieurement ou nous contacter'
      return message.length > SERVER_MESSAGE_MAX_LENGTH ? currentMsg : message
    }

  protected simulationDemande(type: string, queryBody: Object): Promise<IResult<ISimulationDemandePrestation>>{
      switch (type) {
        case 'AVAN':
          return this.simulationAvance(queryBody);
        case 'RP':
          return this.simulationRachatPartiel(queryBody);
      }
    }

  private simulationAvance(queryBody: Object): Promise<IResult<ISimulationDemandePrestation>> {
      const parms = {'DemandePrestationTypeId': 1, ...queryBody };
      return this.simulate(parms);
    }

  private simulationRachatPartiel(queryBody: Object): Promise<IResult<ISimulationDemandePrestation>> {
      const parms = {'DemandePrestationTypeId': 2, ...queryBody };
      return this.simulate(parms);
    }

}
