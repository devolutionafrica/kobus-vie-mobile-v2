// import { IFamilleProduit, IProduct } from '../entities/Produit';
import { listProduits } from 'src/assets/data/produitStaticData';

export abstract class ProduitHandler {

  products = listProduits;
  constructor(){}

  protected loadProductByCodeFiliale(codeFiliale: string): any[] {
    const list = this.products.filiales
      .filter(
        value => {
          if (value.codeFiliale === codeFiliale) {
            return value;
          }
        }
      );
    if (list.length > 0) { return list[0].produits; }
    else { return []; }
  }

  protected laodProduitByProductFamilly(codeFiliale: string, productFamily): any[]{
    let famillyProducts: any[] = [];
    const currentProducts = this.loadProductByCodeFiliale(codeFiliale) as any[];
    famillyProducts = currentProducts
      .filter(
        value => {
          if (value.nature === productFamily) {
            return value;
          }
        }
      );
    if (famillyProducts.length > 0) { return famillyProducts; }
    else { return []; }
  }

  protected loadProductFamillyByCodeFiliale(codeFiliale: string): any[] {
    const list = this.products.filiales
      .filter(
        value => {
          if (value.codeFiliale === codeFiliale) {
            return value;
          }
        }
      );
    if (list.length > 0) { return list[0].familleProduits; }
    else { return []; }
  }

  protected getProductByCode(codeFiliale: string, idProduit: number): any {
    let searchResult: any = null;
    const productList: any[] = this.loadProductByCodeFiliale(codeFiliale);
    if (productList !== null) {
      productList
        .find(item => {
          if (item.id === idProduit) {
            searchResult = item;
          }
        });
    }
    return searchResult;
  }
}
