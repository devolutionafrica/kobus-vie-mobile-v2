import { IFiliale } from 'src/app/core/entities/Filiale';
import { APP_STORAGE_KEY } from './../../config/config';
import { StoreService } from 'src/app/providers/store.service';
import { SouscriptionToolsService } from './../../core/usercases/SouscriptionTools.Service';
// import { IProduct, IProduit } from 'src/app/core/entities/Produit';
import { HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ITypeBeneficiare } from 'src/app/core/entities/TypeBeneficiare';
import { Tools } from 'src/shared/tools/utils';
import { IProduit } from 'src/app/core/entities/Produit';
import { IProposition } from 'src/app/core/entities/Propostion';

import { RecapItemBeneficiaireComponent } from '../recap-item-beneficiaire/recap-item-beneficiaire.component';
import { NgIf, NgFor, DatePipe , UpperCasePipe, DecimalPipe} from '@angular/common';
import {IonIcon} from '@ionic/angular/standalone'

@Component({
  selector: 'app-detail-contrat-view',
  templateUrl: './detail-contrat-view.component.html',
  styleUrls: ['./detail-contrat-view.component.scss'],
  imports:[RecapItemBeneficiaireComponent,NgIf, NgFor, DatePipe, DecimalPipe , UpperCasePipe,  IonIcon]
})
export class DetailContratViewComponent implements OnInit {
  @Input() proposition: IProposition;
  productSelected: IProduit;
  dateCloture: Date;
  isRenteProduct = false;
  devise: string
  detailInfo: any

  typeBeneficiaires: ITypeBeneficiare[] = [
    {
      id: 'ConjointDefautEnfant',
      libelle: 'Conjoint a defaut les enfants',
      occurances: 1
    },
    {
      id: 'ConJoint_Conjointe',
      libelle: 'Le conjoint',
      occurances: 1
    },
    {
      id: 'Autre',
      libelle: 'Autres',
      occurances: 6
    },
    {
      id: 'EnfantsNesOuANaitre',
      libelle: 'Enfants nées ou à naitre',
      occurances: 6
    }
  ]

  constructor(
    private store: StoreService,
    private subscribeService: SouscriptionToolsService){}

  @HostListener('unloaded')
  ngOnDestroy(){
      console.log('SubscribeDetailComponent ngOnDestroy operation');
    }

  ngOnInit() {
    const filiale = this.store.storeValue(APP_STORAGE_KEY.FILIALE) as IFiliale
    this.devise = filiale.devise
    const resp = Tools.formatDate(this.proposition.Contrat.DateEffet);
    this.dateCloture = Tools.getContratCloseTime(resp, this.proposition.Contrat.DureeContrat);
    this.productSelected = this.subscribeService.searchProduitById(this.proposition.Contrat.ProduitId)
    this.isRenteProduct = this.productSelected.dureeRentes.length > 0 ? true : false;
  }

}
