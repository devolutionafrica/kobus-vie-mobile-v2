import { Utilisateur } from "./Utilisateur";

export class Conseiller extends Utilisateur {
  constructor(
    private nuConseiller:number,
    private nom:string,
    private prenom:string,
    private contact:string,
  ){
    super()
  }

  toJson():IConseillerProfil{
    const currentUser:IConseillerProfil = {
      nuConseiller: this.nuConseiller,
      nom: this.nom,
      prenom: this.prenom,
      contact: this.contact,
    }
    return currentUser
  }
}

export interface IConseillerProfil {
  nuConseiller:number,
  nom:string,
  prenom:string,
  contact:string,
}
