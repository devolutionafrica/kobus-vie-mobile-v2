export class ObjectObservationFactory {
  public static build(jsonData: any): IObjectObservation {
    return {
      montantImpayes: jsonData.MontantImpayes,
      nombreImpayees: jsonData.NombreQuittanceImpayees,
      montantTotalPaye: jsonData.MontantTotalPaye,
      montantPrimeEmise: jsonData.MontantPrimesEmises
    }
  }
}

export interface IObjectObservation {
  montantImpayes: number
  nombreImpayees: number
  montantTotalPaye: number
  montantPrimeEmise: number
}
