import { IDureeRente } from "../entities/Produit";

export class DureeRenteObjectFactory {
  public static build(jsonData: any): IDureeRente[] {
    let dureeRente: IDureeRente[] = []
    if (jsonData.length > 0)
      for(let rente of jsonData){
        const currentData = {
          id: parseInt(rente.Id),
          libelle: rente.Libelle
        }
        dureeRente.push(currentData)
      }
    return dureeRente
  }
}

