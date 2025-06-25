import { Periodicite } from './../entities/Periodicite'

export class PeriodiciteFactory {
  public static build(jsonData:any):Periodicite {
    return new Periodicite(
      jsonData.Id,
      jsonData.Libelle,
      jsonData.CodePeriodicite,
      jsonData.Identifiant
    )
  }
}
