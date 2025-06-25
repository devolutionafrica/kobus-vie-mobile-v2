import { IGarantieSouscriteProposition } from "../entities/Propostion";

export class PropositionObjectGarantieSouscriteFactory {
  public static build(jsonData: any): IGarantieSouscriteProposition[] {
    let garantieSouscrite:IGarantieSouscriteProposition[] = []
    const rawGarantieData = jsonData.GarantiesSupplementaires
    for (const garantieItem of rawGarantieData) {
      const garantie = {
        TypeGarantie: "",
        Periodicite: "Annuelle",
        GarantieId: garantieItem.detailGarantie.identifiant,
        Montant: garantieItem.detailGarantie.capital,
        DureeGarantie: jsonData.DureeContrat
      }
      garantieSouscrite.push(garantie)
    }
    return garantieSouscrite
  }
}
