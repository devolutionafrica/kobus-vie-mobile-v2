import { ModeReglement } from "../entities/ModeReglement";

export class ModeReglementFactory {
  public static build(jsonData):ModeReglement {
    return new ModeReglement(
      jsonData.Id,
      jsonData.Identifiant,
      jsonData.Libelle
    )
  }
}
