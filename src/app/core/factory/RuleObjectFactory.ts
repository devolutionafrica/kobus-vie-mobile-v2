import { IRule } from "../entities/Produit"

export class RuleObjectFactory {
  public static build(jsonData: any): IRule {
    return {
      ageMin: jsonData.DureeMinimale,
      ageMax: jsonData.AgeMaximale,
      dureeMin: jsonData.DureeMinimale,
      dureeMax: jsonData.DureeMaximale,
      montantMin: jsonData.MontantMinimum,
      montantMax: jsonData.MontantMaximum,
    }
  }
}

