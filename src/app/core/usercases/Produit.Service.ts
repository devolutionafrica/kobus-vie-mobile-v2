// import { IFamilleProduit } from './../entities/Produit';
import { Injectable } from "@angular/core";
// import { IProduct } from "../entities/Produit";
import { ProduitHandler } from './../handlers/ProduitHandler';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProduitService extends ProduitHandler{

  constructor(){
    super()
  }

  getProductByCodeFiliale(codeFiliale: string): any[]{
      return this.loadProductByCodeFiliale(codeFiliale)
    }

  getFamilleProduit(codeFiliale: string): any[]{
      return this.loadProductFamillyByCodeFiliale(codeFiliale)
    }

  getProductByCodeProduit(codeFiliale: string, codeProduit: number): any{
      return this.getProductByCode(codeFiliale, codeProduit)
    }

  getProductByFamilleProduit(codeFiliale: string, productFamilly: string): any[]{
      return this.laodProduitByProductFamilly(codeFiliale, productFamilly)
    }
}
