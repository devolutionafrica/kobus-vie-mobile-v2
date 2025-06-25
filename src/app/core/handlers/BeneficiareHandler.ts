import { BehaviorSubject } from 'rxjs';
import { BeneficiareFactory } from './../factory/BeneficiareFactory';
import { Beneficiaire, IBeneficiaire } from '../entities/Beneficiaire';

export abstract class BeneficiareHandler {
  beneficiares: IBeneficiaire[];
  beneficiareBehaviorSubject: BehaviorSubject<IBeneficiaire[]>;
  constructor(){
    this.beneficiares = [];
    this.beneficiareBehaviorSubject = new BehaviorSubject<IBeneficiaire[]>(this.beneficiares);
    }

  protected addBeneficiaireItem(jsonData: any): IBeneficiaire[]|boolean{
    let searchBeneficiare: IBeneficiaire|boolean = false;
    const beneficiareObject = BeneficiareFactory.build(jsonData);
    const typeBeneficiareId: string = beneficiareObject.toJson().TypeBeneficiaire;

    if (typeBeneficiareId === 'Autre' ) {
      searchBeneficiare = this.searchBeneficiaireByFullName(beneficiareObject.toJson());
    }
    else { searchBeneficiare = this.searchBeneficiaireByTypeBeneficiareId(beneficiareObject.toJson()); }

    if (searchBeneficiare) { return false; }
    else {
      let currentbeneficier = beneficiareObject.toJson()
      console.log('before beneficier :::> ', currentbeneficier)
      if( typeBeneficiareId !== 'Autre' )  currentbeneficier.Nom = jsonData.beneficierTitle
      console.log('new beneficier info :::> ', currentbeneficier)
      this.pushBeneficiareAndUpdateBehaviorSubject(currentbeneficier);
      return this.beneficiares;
      }
    }


  protected removeBeneficiareItem(beneficiare: IBeneficiaire) {
    this.beneficiares = this.beneficiares
        .filter(
          itemBeneficiare => {
            if (itemBeneficiare !== beneficiare) {
              return itemBeneficiare;
            }
          }
        );
    this.beneficiareBehaviorSubject.next(this.beneficiares);
    console.log(beneficiare);
  }


  private pushBeneficiareAndUpdateBehaviorSubject(beneficiare: any){
      this.beneficiares.push(beneficiare);
      this.beneficiareBehaviorSubject.next(this.beneficiares);
    }

  private searchBeneficiaireByTypeBeneficiareId(beneficiare: IBeneficiaire): IBeneficiaire|boolean {
      const searchResponse = this.beneficiares
        .filter(
          itemBeneficiare => {
            if (itemBeneficiare.TypeBeneficiaire === beneficiare.TypeBeneficiaire) {
              return itemBeneficiare;
            }
          }
        );

      if (searchResponse.length > 0) { return searchResponse[0]; }
      else { return false; }
    }

  private searchBeneficiaireByFullName(beneficiare: IBeneficiaire): IBeneficiaire|boolean {
    const currentFullname = `${beneficiare.Nom} ${beneficiare.Prenoms}`.toUpperCase();
    const searchResponse = this.beneficiares
      .filter(
        itemBeneficiare => {
          const searchFullname = `${itemBeneficiare.Nom} ${itemBeneficiare.Prenoms}`.toUpperCase();
          if (searchFullname === currentFullname) {
            return itemBeneficiare;
          }
        }
      );

    if (searchResponse.length > 0) { return searchResponse[0]; }
    else { return false; }
    }

  cleanMemory(){
    this.beneficiareBehaviorSubject.next([]);
    this.beneficiares = [];
  }
}
