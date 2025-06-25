export class ObjectSituationFactory {
  public static build(jsonData:any): IObjectSituation {
    return {
      valuerRachat: jsonData.ValeurDeRachat,
      valeurRachatPGI: jsonData.ValeurDeRachatPGI,
      capitalAuTerme: jsonData.CapitalAuTerme,
      estimationCapital: jsonData.Estimationducapital
    }
  }
}

export interface IObjectSituation {
  valuerRachat: number
  valeurRachatPGI: number
  capitalAuTerme: number
  estimationCapital: number
}
