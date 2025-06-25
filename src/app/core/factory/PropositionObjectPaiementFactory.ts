import { IPaiement } from './../entities/Propostion';
export class PropositionObjectPaiementFactory {
  public static build(jsonData: any): IPaiement {
    return {
      PaymentId: jsonData.transactionId,
      CompteDebit: "",
      DetailPayment: jsonData.description,
      PaimentProvider: "",
      ModeReglement: "ESPECES",
      Montant: jsonData.amount,
    }
  }
}
