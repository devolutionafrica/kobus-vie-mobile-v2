import { IFractionnement } from './../entities/Produit';

export class FractionnementObjectFactory {
  public static build(jsonData: any): IFractionnement[] {
    let fractionnements: IFractionnement[] = []
    for(let fract of jsonData){
      const currentData = {
        id: parseInt(fract.Id),
        libelle: fract.Libelle
      }
      fractionnements.push(currentData)
    }
    return fractionnements
  }
}

