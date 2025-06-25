import { Client } from "../entities/Client";

export class ClientProfilFactory {
  public static build(jsonData:any):Client {
    return new Client(
      jsonData.NUMERO_CLIENT,
      jsonData.NOM_CLIENT,
      jsonData.PRENOMS_CLIENT,
      jsonData.DATE_NAISSANCE,
      jsonData.LIEU_NAISSANCE,
      jsonData.CIVILITE,
      jsonData.SEXE,
      jsonData.TELEPHONE,
      jsonData.NUMERO_DE_COMPTE,
      jsonData.CLE_RIB,
      jsonData.EMAIL,
      jsonData.ADRESSE_POSTALE,
      jsonData.TELEPHONE_1,
      jsonData.PROFESSION,
      jsonData.NATIONALITE,
      jsonData.TYPE_CLIENT,
      jsonData.CODE_FILIALE,
      jsonData.DATE_CREATION,
      jsonData.DATE_MODIFICATION,
      jsonData.SITUATION_MATRIMONIALE,
      jsonData.PHOTO_UTILISATEUR,
      jsonData.PHOTO
    )
  }
}
