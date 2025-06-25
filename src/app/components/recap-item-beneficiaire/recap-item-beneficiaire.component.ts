import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { IBeneficiaire } from 'src/app/core/entities/Beneficiaire';
import { ITypeBeneficiare } from 'src/app/core/entities/TypeBeneficiare';
import { TypeBeneficiareHandler } from 'src/app/core/handlers/TypeBeneficiareHandler';
import {NgIf} from '@angular/common'
@Component({
  selector: 'app-recap-item-beneficiaire',
  templateUrl: './recap-item-beneficiaire.component.html',
  styleUrls: ['./recap-item-beneficiaire.component.scss'],
  imports:[NgIf]
})
export class RecapItemBeneficiaireComponent implements OnInit, OnDestroy {
  @Input() beneficiaireJson:IBeneficiaire
  @Input() typeBeneficiaires:ITypeBeneficiare[]
  beneficiareFullname:string
  typeBeneficiare:string

  constructor() { }

  @HostListener('unloaded')
  ngOnDestroy() {}

  ngOnInit() {
    this.typeBeneficiare = this.beneficiaireJson.TypeBeneficiaire
    this.beneficiareFullname = `${this.beneficiaireJson.Nom} ${this.beneficiaireJson.Prenoms}`
    this.beneficiareFullname = this.typeBeneficiare === "Autre" ?
    `${this.beneficiaireJson.Nom} ${this.beneficiaireJson.Prenoms}`: this.getLibelleTypeBeneficiare()
    }

  getLibelleTypeBeneficiare():string {
      TypeBeneficiareHandler.typeBeneficiares = this.typeBeneficiaires
      const typeBeneficiaire = TypeBeneficiareHandler.getTypeBeneficiareById(this.beneficiaireJson.TypeBeneficiaire)
      return typeBeneficiaire.libelle
    }

}
