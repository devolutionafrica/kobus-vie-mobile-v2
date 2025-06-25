import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonContent, IonButtons, IonMenuButton, IonIcon, IonImg, IonText, IonRow, IonCol, IonRefresher, IonRefresherContent} from '@ionic/angular/standalone';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { TranslateService } from '@ngx-translate/core';
import { NgCircleProgressModule,CircleProgressOptions } from 'ng-circle-progress';

import { PlatformService } from 'src/shared/services/platform.service';
import { SouscriptionToolsService } from './../../../core/usercases/SouscriptionTools.Service';

import { IBilanGraph } from 'src/app/models/model';
import { IClientUniqueContrats, IContrat } from 'src/app/models/contrat.model';

import { StoreService } from 'src/app/providers/store.service';
import { PanierService } from 'src/app/core/usercases/Panier.Service';
import { APP_STORAGE_KEY, NUMBER_DEFAULT_CONTRAT } from 'src/app/config/config';
import { PropositionService } from 'src/app/core/usercases/Proposition.Service';
import { SessionService } from 'src/app/providers/session.service';
import { KobusClientUniqueService } from 'src/app/core/usercases/KobusClientUnique.Service';

import { ModalRecapPanierComponent } from '../detail-contrat/modal-recap-panier/modal-recap-panier.component';
import { CarrouselProductComponent } from './carrousel-product/carrousel-product.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { MenuSliderComponent } from './menu-slider/menu-slider.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  providers: [{ provide: CircleProgressOptions, useValue: {} }],
  imports: [
    CommonModule,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonImg,
    IonText,
    IonRow,
    IonCol,
    IonRefresher,
    IonRefresherContent,
    MatIconModule,
    MatBadgeModule,
    MenuSliderComponent,
    CarrouselProductComponent,
    DashboardCardComponent,
    NgCircleProgressModule
  ]
})
export class DashboardPage implements OnInit {
  canSubscribe:boolean
  filiale: any;
  userData: any;
  products: any[];
  clientNumber: number;
  platformValue: string
  contratNumber: number;
  payListNumber: number;
  propositionNumber: number;
  percentageActivity: number;
  openAllContratPage = false;
  contrats: IClientUniqueContrats;
  bilanGraphData: IBilanGraph;
  matBadgeHiddenPanier: boolean;
  matBadgeHiddenProposition: boolean;

  constructor(
    private route: Router,
    private _store: StoreService,
    private _session: SessionService,
    private platform: PlatformService,
    private translate: TranslateService,
    private _toastCtl: ToastController,
    private panierService: PanierService,
    private modalRecapImpaye: ModalController,
    private propositionService: PropositionService,
    private _uniqueClientService: KobusClientUniqueService,
    private _subscribeToolsService: SouscriptionToolsService) {
      this.platformValue = this.platform.getPlatform()
    }

  refreshDashboardValue($event?:any){
    this.userData = {
      ...this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER),
      filiale: this.filiale
    };
    this.percentageActivity = 0;
    const params = {"CodeClient": this.userData.nuClient}

    this.propositionService.findAllProposition(params)
    this.contrats = this._session.storeValue(APP_STORAGE_KEY.CONTRATS) as IClientUniqueContrats;

    this._uniqueClientService.getGlobalTauxEngagementByUniqueClient(this.clientNumber)
      .then(
        result => {
          if(result.status)
          this.bilanGraphData = {
            numberImpaye: this.contrats.totalImpayeesCount,
            numberContrats: this.contrats.totalCount,
            numberCotation: 0,
            numberPrestation: this.contrats.totalPrestationsCount,
            tauxEngagement: result.data.taux,
          }
        }
      )
      .catch(
        error => this.presentToast(
         'Nous avons rencontré un problème lors de chargement de certaines données. Glisser vers le bas pour refraichir de nouveau.'))
      .finally(()=> $event?.target.complete())
  }

  async presentToast(msg) {
    const toast = await this._toastCtl.create({
      message: msg,
      position: 'top',
      duration: 5000,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          handler: () => {}
        }
      ]
    });
    toast.present();
  }

  doRefresh(event) {
    this.refreshDashboardValue(event)
  }

  ionViewWillEnter(){
    this.refreshDashboardValue()
  }

  ngOnInit() {
    const parrainKey = this._store.storeValue(APP_STORAGE_KEY.PARRAIN_KEY) as number
    if(parrainKey)
      this._store.dispatch(APP_STORAGE_KEY.DEFAULT_APPORTEUR, parrainKey)
    else
      this._subscribeToolsService.apporteurParDefaut()
        .then(
          resp => {
            // console.log('Apporteur',resp.NumeroApporteur)
            this._store.dispatch(APP_STORAGE_KEY.DEFAULT_APPORTEUR, parseInt(resp.NumeroApporteur))
          }
        )

    const authObject = this._session.storeValue(APP_STORAGE_KEY.AUTH);
    if (authObject.isFirstConnexion) { this.route.navigate(['/cgu-page']); }

    this.clientNumber = this._session.storeValue(APP_STORAGE_KEY.AUTH).clientNumber;
    this.filiale = this._store.storeValue(APP_STORAGE_KEY.FILIALE);
    this._subscribeToolsService.loadProduits()


    this.panierService.panierBehaviorSubject.subscribe(panierContant => {
      this.payListNumber = panierContant.length;
      this.matBadgeHiddenPanier = this.payListNumber >= 1 ? false : true;
    });
    this.openAllContratPage =  this.contratNumber > NUMBER_DEFAULT_CONTRAT ? true : false;

    this.propositionService.cotationNumber.subscribe(cotationCount => {
      this.propositionNumber = cotationCount;
      this.matBadgeHiddenProposition = this.propositionNumber >= 1 ? false : true;
    });
  }

  async openPanier(){
    const modal = await this.modalRecapImpaye.create({
      component: ModalRecapPanierComponent,
      cssClass: 'modal-recap-panier-cmp',
      
      //swipeToClose: true,
    });
    await modal.present();
  }

  moveToProposition(){
    this.route.navigate(['propositions']);
  }

  goToContrats(){
    this.route.navigate(['contrats']);
  }

  goToImpayes(){
    this.route.navigate(['liste-impayes']);
  }

}
