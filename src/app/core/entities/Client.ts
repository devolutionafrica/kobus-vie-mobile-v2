import { Utilisateur } from "./Utilisateur";

export class Client extends Utilisateur{

  constructor(
    private nuClient:number,
    private nom:string,
    private prenom:string,
    private dateNaissance:string,
    private lieuNaissance:string,
    private civilite:string,
    private sexe:string,
    private telephone:string,
    private numeroCompte:string,
    private cleRIB?:string,
    private email?:string,
    private adressePostal?:string,
    private telephone1?:string,
    private profession?:string,
    private nationalite?:string,
    private typeClient?:string,
    private codeFiliale?:string,
    private dateCreation?:string,
    private dateModification?:string,
    private situationMatrimoniale?:string,
    private photoUtilisateur?:string,
    private photo?:string ){
      super()
    }

  toJson():IClientProfil{
    const currentUser:IClientProfil = {
      nuClient: this.nuClient,
      nom: this.nom,
      prenom: this.prenom,
      dateNaissance: this.dateNaissance,
      lieuNaissance: this.lieuNaissance,
      civilite: this.civilite,
      sexe: this.sexe,
      telephone: this.telephone,
      numeroCompte: this.numeroCompte,
      cleRIB: this.cleRIB,
      email: this.email,
      adressePostal: this.adressePostal,
      telephone1: this.telephone1,
      profession: this.profession,
      nationalite: this.nationalite,
      typeClient: this.typeClient,
      codeFiliale: this.codeFiliale,
      dateCreation: this.dateCreation,
      dateModification: this.dateModification,
      situationMatrimoniale: this.situationMatrimoniale,
      photoUtilisateur: this.photoUtilisateur,
      photo: this.photoUtilisateur
    }
    return currentUser
  }
}

export interface IClientProfil {
  nuClient:number,
  nom:string,
  prenom:string,
  dateNaissance:string,
  lieuNaissance:string,
  civilite:string,
  sexe:string,
  telephone:string,
  numeroCompte:string,
  cleRIB?:string,
  email?:string,
  adressePostal?:string,
  telephone1?:string,
  profession?:string,
  nationalite?:string,
  typeClient?:string,
  codeFiliale?:string,
  dateCreation?:string,
  dateModification?:string,
  situationMatrimoniale?:string,
  photoUtilisateur?:string,
  photo?:string
}
