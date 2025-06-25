import {
  IClientUniqueContrats,
  IContrat,
  IReglementPrestation,
  ITauxEngagement } from "src/app/models/contrat.model";
import { IResult } from "src/app/models/model";

export interface IKSClientUniqueServiceAdaptor {
  getDetailContrat(queryBody: any): Promise<IResult<IContrat|null>>
  getReglementByPolice(queryBody: any) : Promise<IResult<IReglementPrestation|null>>
  getReglementBySinistre(queryBody: any) : Promise<IResult<IReglementPrestation|null>>
  getTauxEngagementByPolice(numeroPolice: string): Promise<IResult<ITauxEngagement|null>>
  getUniqueClientContrats(numeroClient: number): Promise<IResult<IClientUniqueContrats|null>>
  getGlobalTauxEngagementByUniqueClient(numeroClient: number): Promise<IResult<ITauxEngagement|null>>
}
