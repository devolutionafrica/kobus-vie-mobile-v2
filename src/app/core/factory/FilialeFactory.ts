import {
  IFilialeJsonFormat,
  Filiale } from "../entities/Filiale";

export class FilialeFactory {
  public static build(jsonData: any): IFilialeJsonFormat {
    return new Filiale(
      jsonData.ApiUrl,
      jsonData.Devise,
      jsonData.Libelle,
      jsonData.IdFiliale,
      jsonData.CodeFiliale,
      jsonData.DocumentUrl,
      jsonData.CodeFilialePaiement,
      jsonData.UrlVideoPublicitaire,
      jsonData.ApiSouscriptionUrl,
      `${jsonData.IxpertaPayUrl}`.trim(),
      jsonData.IxpertaPayApiKey
    ).toJson()
  }
}
