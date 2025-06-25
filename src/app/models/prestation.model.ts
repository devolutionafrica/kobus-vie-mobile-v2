export interface ISimulationDemandePrestation{
  taux: number,
  phones: string[],
  periodicite: string,
  listEcheance: any[],
  listReglement: any[],
  numeroPolice: number,
  nombreMoisMax: number,
  nombreMoisMin: number,
  compteBancaire: string
  montantDemande: number,
  montantDeRachat: number,
  nombreMoisDemande: number,
  defaultModeReglement: string,
  isEligible?: boolean
}
