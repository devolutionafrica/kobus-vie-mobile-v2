import { Prime } from "./Prime";

export class Panier {
  constructor(
    private _montantTotal:number,
    private _primes:Prime[]
  ){}

  get montantTotal (){
    return this._montantTotal
  }

  set montantTotal(value:number){
    this._montantTotal = value
  }

  setPrime(primes:Prime[]){
    this._primes = primes
  }

  getPrime():Prime[]{
    return this._primes
  }
}
