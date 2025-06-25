import { TypeBeneficiareHandler } from './../../../../core/handlers/TypeBeneficiareHandler';
import { Component, Input, OnInit, HostListener, OnDestroy } from '@angular/core';
import { IBeneficiaire } from 'src/app/core/entities/Beneficiaire';
import { BeneficiareService } from 'src/app/core/usercases/Beneficiaire.Service';
import { ITypeBeneficiare } from 'src/app/core/entities/TypeBeneficiare';

@Component({
  selector: 'app-item-beneficier',
  templateUrl: './item-beneficier.component.html',
  styleUrls: ['./item-beneficier.component.scss'],
})
export class ItemBeneficierComponent implements OnInit {

  @Input() beneficiaireJsonObject: IBeneficiaire;
  @Input() typeBeneficiaires: ITypeBeneficiare[];
  beneficiareFullname: string;

  constructor(
    private beneficiareService: BeneficiareService) { }

  ngOnInit() {
    this.beneficiareFullname = this.beneficiaireJsonObject.TypeBeneficiaire === 'Autre' ?
    `${this.beneficiaireJsonObject.Nom} ${this.beneficiaireJsonObject.Prenoms}` : this.getLibelleTypeBeneficiare();
    }

  getLibelleTypeBeneficiare(): string {
      TypeBeneficiareHandler.typeBeneficiares = this.typeBeneficiaires;
      const typeBeneficiaire = TypeBeneficiareHandler.getTypeBeneficiareById(this.beneficiaireJsonObject.TypeBeneficiaire);
      return typeBeneficiaire.libelle;
    }

  onPopBenef = () => {
    this.beneficiareService.removeBeneficiare(this.beneficiaireJsonObject);
  }

}
