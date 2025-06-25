import { ICompte } from './../entities/Propostion';
export class PropositionObjectCompteFactory {
  public static build(jsonData: any): ICompte {
    if (!jsonData.souscripteur.compteBancaire){
      return {
        TypeCompte: "",
        NumeroCarte: "",
        Domiciliation: "",
        FinValidite: '',
        CodeBanque: "",
        CodeAgence: "",
        Racine: "",
        CleRib: ""
      }
    }
    const infoBankCard = jsonData.souscripteur.compteBancaire.split('-')
    return {
      TypeCompte: jsonData.souscripteur.typeCompte,
      NumeroCarte: jsonData.souscripteur?.numeroCarte,
      Domiciliation: jsonData.souscripteur?.domiciliation,
      FinValidite: jsonData.souscripteur?.finValidite,
      CodeBanque: infoBankCard[0] || "",
      CodeAgence: infoBankCard[1] || "",
      Racine: infoBankCard[2] || "",
      CleRib: infoBankCard[3] || ""
    }
  }
}
