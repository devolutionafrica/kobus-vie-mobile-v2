import { Injectable } from '@angular/core';
import { IBeneficiaire } from '../entities/Beneficiaire';
import { BeneficiareHandler } from '../handlers/BeneficiareHandler';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class BeneficiareService extends BeneficiareHandler {

  constructor(){
    super();
  }

  addBeneficiare(jsonData: object): IBeneficiaire[]|boolean{
    return this.addBeneficiaireItem(jsonData);
    }

  removeBeneficiare(beneficiare: IBeneficiaire){
    this.removeBeneficiareItem(beneficiare);
  }

  ngOnDestroy(){
    this.cleanMemory();
  }
}
