import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuController, IonMenu, IonContent, IonRow, IonCol, IonImg, IonIcon } from '@ionic/angular/standalone';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { StoreService } from 'src/app/providers/store.service';
import { SessionService } from 'src/app/providers/session.service';
import { PanierService } from 'src/app/core/usercases/Panier.Service';
import { AlertButtomText, alertIcon, QuestionAlertModal } from 'src/shared/tools/modal';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu-slider',
  templateUrl: './menu-slider.component.html',
  styleUrls: ['./menu-slider.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonMenu,
    IonContent,
    IonRow,
    IonCol,
    IonImg,
    IonIcon
  ]
})
export class MenuSliderComponent implements OnInit {

  @Input() userData;
  filialeIcon:string

  constructor(
    private route: Router,
    private store:StoreService,
    private session:SessionService,
    private menuControl:MenuController,
    private panierService:PanierService,
    private _spinner: NgxSpinnerService,
  ){}

  ngOnInit(): void {
   this.filialeIcon = this.store.storeValue(APP_STORAGE_KEY.FILIALE).icon
  }

  onDisconnect(){
    const btnText:AlertButtomText = {
      cancel: 'Annuler',
      confirm: 'Confirmer'
    }
    QuestionAlertModal.show("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", alertIcon.question, btnText)
        .then(
          result => {
            if(result.role === 'confirm') {
              this.panierService.panierBehaviorSubject.next([])
              this.menuControl.close('main-menu')
              this.store.dispatch(APP_STORAGE_KEY.PROPOSITIONS, null)
              this.session.dispatch(APP_STORAGE_KEY.CURRENT_USER, null)
              this.session.dispatch(APP_STORAGE_KEY.CONTRATS, null)
              this.session.dispatch(APP_STORAGE_KEY.AUTH, null)
              this.route.navigate(['login'])
            }
          }
        )
  }

  onGoToProfil = ():void => {
    this.menuControl.close('main-menu')
    this.route.navigate(['profil'])
  }

  onGoToProduct  = ():void => {
    this.menuControl.close('main-menu')
    this.route.navigate(['products'])
  }

  onGoToServiceClient = ():void => {
    this.menuControl.close('main-menu')
    this.route.navigate(['service-client'])
  }

  onGoToContrats = ():void => {
    this.menuControl.close('main-menu')
    this.route.navigate(['/contrats'])
  }

  onGoToPropositions = ():void => {
    this.menuControl.close('main-menu')
    this.route.navigate(['/propositions'])
  }

  onGoToParams = ():void => {
    this.menuControl.close('main-menu')
    this.route.navigate(['/parametre'])
  }

}
