import { Beneficiaire } from "../entities/Beneficiaire";

export class BeneficiareFactory {
  public static build(jsonData:any):Beneficiaire {
    return new Beneficiaire(
        jsonData.typeBeneficiaire,
        jsonData.tauxRepartition,
        jsonData.nom,
        jsonData.prenom,
        jsonData.dateNaissance,
        jsonData.lieuNaissance,
        jsonData.contact
      )
    }
}
