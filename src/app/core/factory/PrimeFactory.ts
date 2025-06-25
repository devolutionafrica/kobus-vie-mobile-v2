import { IPrime, Prime } from './../entities/Prime';
export class PrimeFactory {

  public static build(jsonData: any): IPrime {
    const primeObject = new Prime(
      jsonData.CodeFiliale,
      jsonData.LibelleProduit,
      jsonData.NumeroQuittance,
      jsonData.PrimePeriodique,
      jsonData.NumeroPolice,
      jsonData.DebutPeriode,
      jsonData.FinPeriode,
      jsonData.EtatQuittance
    );
    primeObject.setSelected(false);
    return primeObject.toJson();
  }
}
