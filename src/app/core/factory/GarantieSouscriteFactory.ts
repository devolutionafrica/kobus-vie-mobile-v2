import { GarantieSouscrite, IGarantieSouscriteFacultativeFactory } from "../entities/GarantieSouscrite";

export class GarantieSouscriteFactory {
  public static build(jsonData):GarantieSouscrite {
    return new GarantieSouscrite(
      jsonData.Nom,
      parseInt(`${jsonData.Prime}`),
      jsonData.Identifiant
    )
  }
}



export class GarantieSouscriteFacultativeObjectFactory {
  public static build(jsonData: any): IGarantieSouscriteFacultativeFactory[] {
    let garantieFacultative: IGarantieSouscriteFacultativeFactory[] = []
    if (jsonData.length > 0)
      for(let garantie of jsonData){
        const currentData = {
          prime: garantie.Prime,
          identifiant: garantie.Id,
          libelle: garantie.Nom,
          code: garantie.Identifiant,
          montant: garantie.MontantCapital,
          abreviation: garantie.Abreviation,
        }
        garantieFacultative.push(currentData)
      }
    return garantieFacultative
  }
}
