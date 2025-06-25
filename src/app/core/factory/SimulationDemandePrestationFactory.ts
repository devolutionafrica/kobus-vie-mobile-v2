import { ISimulationDemandePrestation } from "src/app/models/prestation.model";

export class SimulationDemandePrestationFactory {
  public static build(jsonData:any):ISimulationDemandePrestation{
    console.log('jsonData :::> ', jsonData)
    return {
      taux: jsonData.Taux,
      isEligible: jsonData.isEligble,
      phones: jsonData.TelephonesMobileMoney,
      periodicite: jsonData.Periodicite,
      numeroPolice: jsonData.NumeroPolice,
      listEcheance: jsonData.ListeEcheances,
      nombreMoisMax: jsonData.NbreMoisMax,
      nombreMoisMin: jsonData.NbreMoisMin,
      listReglement: jsonData.ListeModeReglement,
      compteBancaire: jsonData.CompteBancaire,
      montantDemande: parseInt(`${jsonData.Montant}`),
      montantDeRachat: parseInt(`${jsonData.MontantRachatMaximum}`),
      nombreMoisDemande: jsonData.NbreMoisDemande,
      defaultModeReglement: jsonData.ModeReglementParDefaut,
    }
  }
}

