import { SimulationProduit } from "../entities/SimulationProduit";
import { GarantieSouscriteHandler } from "../handlers/GarantieSouscriteHandler";
import { GarantieSouscriteFacultativeObjectFactory } from "./GarantieSouscriteFactory";

export class SimulationProduitFactory{
  public static build(jsonData:any):SimulationProduit {
    return new SimulationProduit(
      parseInt(`${jsonData.CapitalAcquis}`),
      parseInt(`${jsonData.CapitalEspere}`),
      GarantieSouscriteHandler.buildGarantieSouscriteList(jsonData.ListeGarantiePrincipaleSouscrites),
      GarantieSouscriteFacultativeObjectFactory.build(jsonData.ListeGarantieSupplementaireSouscrites),
      parseInt(`${jsonData.PrimeDeces}`),
      parseInt(`${jsonData.PrimePeriodique}`),
      parseInt(`${jsonData.PrimeSurvie}`),
      parseInt(`${jsonData.FraisAdhesion}`),
      parseInt(`${jsonData.CoutPiece}`),
      parseInt(`${jsonData.MontantPremierePrime}`)
    )
  }
}
