import { DemandePrestation } from "../entities/DemandePrestation";

export class DemandePrestationFactory {
  public static build(jsonData:any):DemandePrestation {
    return new DemandePrestation(
      jsonData.DateDem,
      jsonData.DemandePrestationType,
      jsonData.IdDemande,
      jsonData.ModeReglement,
      jsonData.Montant,
      jsonData.NUMERO_CLIENT,
      jsonData.Police,
      jsonData.PoliceDemande,
      jsonData.Produit,
      jsonData.StatutSinistre
    )
  }
}
