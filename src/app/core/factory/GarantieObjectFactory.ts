import { IGarantie, IGarantieFacultative } from './../entities/Produit';

export class GarantieObjectFactory {
  public static build(jsonData: any): IGarantie[] {
    let garanties: IGarantie[] = []
    if (jsonData.length > 0)
      for(let garantie of jsonData){
        const currentData = {
          id: parseInt(garantie.Id),
          libelle: garantie.Libelle,
          montant: Math.ceil(garantie.MontantCapital),
          identifiant: garantie.Identifiant,
          abreviation: garantie.Abreviation,
          statut: garantie.Statut,
        }
        garanties.push(currentData)
      }
    return garanties
  }
}

export class GarantieFacultativeObjectFactory {
  public static build(jsonData: any): IGarantieFacultative[] {
    let garantieFacultative: IGarantieFacultative[] = []
    if (jsonData.length > 0)
      for(let garantie of jsonData){
        const currentData = {
          code: garantie.Identifiant,
          libelle: garantie.Libelle,
          capital: garantie.MontantCapital,
          version: garantie.Version,
          identifiant: garantie.Id,
          abreviation: garantie.Abreviation,
          coeffGarantie: garantie.CoefficientGarantie,
          plafondCapital: garantie.MontantPlafontCapital
        }
        garantieFacultative.push(currentData)
      }
    return garantieFacultative
  }
}
