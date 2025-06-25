import { TypeBeneficiare } from './../entities/TypeBeneficiare'

export class TypeBeneficaireFactory {
  public static build(jsonData:any):TypeBeneficiare {
    return new TypeBeneficiare(
      jsonData.id,
      jsonData.libelle,
      jsonData.occurances
    )
  }
}
