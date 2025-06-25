import { IPieceJointe } from './../entities/Produit';
export class PieceJointeObjectFactory {
  public static build(jsonData: any): IPieceJointe[] {
    let pieceJointes: IPieceJointe[] = []
    if (jsonData.length > 0)
      for(let garantie of jsonData){
        const currentData = {
          id: parseInt(garantie.Id),
          libelleDocx: garantie.LibelleDocument,
          natureProduit: garantie.NatureProduit
        }
        pieceJointes.push(currentData)
      }
    return pieceJointes
  }
}

