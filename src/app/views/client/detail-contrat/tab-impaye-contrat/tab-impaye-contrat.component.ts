import { IPrime } from './../../../../core/entities/Prime';
import { IContratClient } from './../../../../core/entities/ContratClient';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { PanierService } from 'src/app/core/usercases/Panier.Service';
import { TranslateService } from '@ngx-translate/core';
import { ModalRecapPanierComponent } from '../modal-recap-panier/modal-recap-panier.component';
import Swal from 'sweetalert2';
import { IContrat, IImpaye } from 'src/app/models/contrat.model';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ItemImpayeComponent } from '../item-impaye/item-impaye.component';
import { IonRow, IonCol, IonText, IonCheckbox } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab-impaye-contrat',
  templateUrl: './tab-impaye-contrat.component.html',
  styleUrls: ['./tab-impaye-contrat.component.scss'],
  imports: [
    NgModule,
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    TranslateModule,
    ItemImpayeComponent,
    IonRow,
    IonCol,
    IonText,
    IonCheckbox
  ] 
})
export class TabImpayeContratComponent implements OnInit, OnDestroy {
  @Input() contratDetail: IContrat;
  @Input() userAction: string;
  countImpayee = 0;
  selectAll = false;
  subscribeObject: any;
  listImpaye: IImpaye[];
  isEmpty: boolean;
  actionChecked: any;

  constructor(
    private translate: TranslateService,
    private modalRecapImpaye: ModalController,
    private panierService: PanierService) {
      this.actionChecked = {
        action: 'None',
        value: null
      };
     }

  toggleSelect(){
    this.selectAll = !this.selectAll;
    this.actionChecked = {
      action: this.selectAll ? 'AUTO' : 'MAN',
      value: this.selectAll
    };
  }

  ngOnInit() {
    this.listImpaye = this.contratDetail.impayes.data ;
    this.isEmpty = this.contratDetail.impayes.count === 0 ? true : false;
    this.subscribeObject = this.panierService.panierBehaviorSubject
      .subscribe(
        resp => {
          this.countImpayee = resp.length;
          this.checkOnAllSelect(resp);
        }
      );
  }

  ngOnDestroy(){
    this.subscribeObject.unsubscribe();
  }

  infoModalPresent(){
    const message = `
    Vous ne pouvez pas regler vos impayés.
    Nous vous prions de contactez votre
    assurrance pour plus de detail.
    `;
    Swal.fire({
      icon: 'info',
      confirmButtonColor: '#133459',
      allowOutsideClick: false,
      confirmButtonText: `Fermer`,
      text: message,
    });
  }

  async openPanier(){
    if (this.userAction !== 'Actif') { this.infoModalPresent(); }
    else {
      const modal = await this.modalRecapImpaye.create({
        id: 'panier_recap_modal',
        component: ModalRecapPanierComponent,
        cssClass: 'modal-recap-panier-cmp',
        componentProps: {
          nuContrat: this.contratDetail.detailContrat.numeroPolice
        }
      });
      return await modal.present();
    }
  }

  executeChildAction($data){
    if (this.userAction === 'Actif') {
      switch ($data.action) {
        case 'REMOVE':
          $data.value.selected = false;
          this.panierService.removePrimeFromPanier({...$data.value});
          break;
        default:
          $data.value.selected = true;
          this.panierService.addPrimeFromPanier({...$data.value});
          break;
      }
    }
  }

  checkOnAllSelect(impayes){
    let countSelected = 0;
    const nbQuittenceImpayes = this.contratDetail.impayes.count
    impayes.filter(
      impaye => this.listImpaye
        .filter(
          currentImpaye => {
            if (currentImpaye.numeroQuittance === impaye.numeroQuittance) {
              countSelected++;
            }
          }
        )
      );
    if (nbQuittenceImpayes > 0 && nbQuittenceImpayes === countSelected) { this.selectAll = true; }
    else { this.selectAll = false; }
  }

}
