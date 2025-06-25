import { PaiementMobile } from "../entities/PaiementMobile";

export class PaiementMobileFactory {
  public static build(jsonData):PaiementMobile {
    return new PaiementMobile(
      jsonData.CodeStatutTransaction,
      jsonData.montant,
      jsonData.numero,
      jsonData.operateur,
      jsonData.ReferenceId,
      jsonData.reftransaction
    )
  }
}
