import { Injectable } from "@angular/core";
import { PanierHandler } from './../handlers/PanierHandler';
import { SessionService } from "src/app/providers/session.service";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PanierService extends PanierHandler{

  constructor(session:SessionService){
    super(session)
    }

  addPrimeFromPanier(prime:any){
      this.addPrime(prime)
    }

  removePrimeFromPanier(prime:any){
      this.removePrime(prime)
    }

  clean(){
      this.cleanPanier();
    }
}
