import { OperateurMobile } from "../entities/Operateur";

export class OperateurMobileFactory {

  public static build(jsonData:any):OperateurMobile{
    return new OperateurMobile(
      jsonData.CodeOperateur,
      jsonData.CodePays,
      jsonData.IndicatifPays,
      jsonData.NeedOTP,
      jsonData.Pays,
      jsonData.operateur
    )
  }
}
