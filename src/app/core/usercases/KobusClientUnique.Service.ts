import { Injectable } from "@angular/core";
import {
  IReglementPrestation,
  ITauxEngagement,
  IClientUniqueContrats,
  IContrat } from "src/app/models/contrat.model";
import { IResult } from "src/app/models/model";
import { ExternalUniqueClientApi } from "src/app/repository/EXTERNAL_UNIQUE_CLIENT_API";
import { IKSClientUniqueServiceAdaptor } from "../adaptors/IKSClientUniqueServiceAdaptor";
import {
  TauxEngagementByPoliceFactory,
  TauxEngagementGlobalFactory,
  UniqueClientContratFactory,
  UniqueClientContratsFactory,
  UniqueClientPrestationReglememntFactory
} from "../factory/ContratFullDetailFactory";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class KobusClientUniqueService implements IKSClientUniqueServiceAdaptor {

  constructor(
    private _api:ExternalUniqueClientApi){}

  getDetailContrat(queryBody: any): Promise<IResult<IContrat>> {
    return this._api.contratDetailByNumberPolice(queryBody)
      .toPromise()
      .then(
        data => {
          if(data.Success)
            return {
              data: UniqueClientContratFactory.build(data) as IContrat,
              status: true,
              message: ""
            }
          else
            return {
              data: null,
              status: false,
              message: ""
            };
        }
      )
      .catch(error => error)
  }

  getUniqueClientContrats(numeroClient: number): Promise<IResult<IClientUniqueContrats>> {
    return this._api.listPoliceByUniqueClientNumber(numeroClient)
      .toPromise()
      .then(
        data => {
          if(data.Success)
            return {
              data: UniqueClientContratsFactory.build(data) as IClientUniqueContrats,
              status: true,
              message: ""
            }
          else
            return {
              data: null,
              status: false,
              message: ""
            };
        }
      )
      .catch(error => error)
  }

  getReglementByPolice(queryBody: any): Promise<IResult<IReglementPrestation>> {
    return this._api.getReglementsPrestationByPolice(queryBody)
      .toPromise()
      .then(
        data => {
          if(data.Success)
            return {
              data: UniqueClientPrestationReglememntFactory.build(data) as IReglementPrestation,
              status: true,
              message: ""
            }
          else
            return {
              data: null,
              status: false,
              message: ""
            };
        }
      )
      .catch(error => error)
  }

  getReglementBySinistre(queryBody: any): Promise<IResult<IReglementPrestation>> {
    throw new Error("Method not implemented.");
  }

  getTauxEngagementByPolice(numeroPolice: string): Promise<IResult<ITauxEngagement>> {
    return this._api.tauxEngagementByPolice(numeroPolice)
      .toPromise()
      .then(
        data => {
          console.log(data)
          if(data.Success) {
            const resultTaux = TauxEngagementByPoliceFactory.build(data.RecapitulatifEtatCotisationView)
            return {
              data: resultTaux,
              status: true,
              message: ""
            }
          }
          else return {
            data: null,
            status: false,
            message: ""
          }
        }
      )
      .catch(error => error)
  }

  getGlobalTauxEngagementByUniqueClient(numeroClient: number): Promise<IResult<ITauxEngagement>> {
    return this._api.tauxEngagementByUniqueClient(numeroClient)
      .toPromise()
      .then(
        data => {
          if(data.Success) {
            const resultTaux = TauxEngagementGlobalFactory.build(data)
            return {
              data: resultTaux as ITauxEngagement,
              status: true,
              message: ""
            }
          }
          else return {
            data: null,
            status: false,
            message: ""
          }
        }
      )
      .catch(error => error)
  }

}
