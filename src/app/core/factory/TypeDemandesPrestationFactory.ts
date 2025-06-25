import { TypeDemandesPrestation } from './../entities/TypeDemandesPrestations';
export class TypeDemandesPrestationFactory {
  public static build(jsonData):TypeDemandesPrestation {
    return new TypeDemandesPrestation(
      jsonData.Id,
      jsonData.Identifiant,
      jsonData.JourDelaiPrestation,
      jsonData.Libelle
    )
  }
}
