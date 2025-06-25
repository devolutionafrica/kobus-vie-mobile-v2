export class PropositionObjectSouscripteurFactory {
  public static build(jsonData:any):IPropositionObjectSouscription {
    return {
      Identifiant: jsonData.souscripteur.numClient || "" ,
      Civilite: jsonData.souscripteur.sexe,
      Nom: jsonData.souscripteur.nom,
      Prenoms: jsonData.souscripteur.prenom,
      DateNaissance: jsonData.souscripteur.dateNaiss,
      Profession: jsonData.souscripteur.professionClient,
      LieuDeNaissance: jsonData.souscripteur.lieuNaiss,
      Prefixe: 0,
      Telephone: jsonData.souscripteur.contact,
      BoitePostale: "",
      Email: jsonData.souscripteur.adressEmail
    }
  }
}

export interface IPropositionObjectSouscription {
  Identifiant: string,
  Civilite: string,
  Nom: string,
  Prenoms: string,
  DateNaissance: string,
  Profession: string,
  LieuDeNaissance: string,
  Prefixe: number,
  Telephone: number,
  BoitePostale: string,
  Email: string
}

export interface IClientObject {
  numeroClient: number,
  nomClient: string,
  prenomClient: string,
  dateNaissanceClient: string,
  lieuNaissanceClient: string,
  contactClient: string,
  adressePostalClient: string,
  adresseEmailClient: string
}
